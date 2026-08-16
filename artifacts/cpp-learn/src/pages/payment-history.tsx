import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle, Clock, ArrowLeft, Receipt } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  type: string;
  description: string;
  paid_at: string;
  created_at: string;
  metadata?: { transaction_ref?: string; provider?: string };
}

export default function PaymentHistoryPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user) return;
      if (isSupabaseConfigured()) {
        try {
          const sb = getSupabaseClient();
          const { data, error } = await sb
            .from('payments')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          if (error) throw error;
          setPayments(data || []);
        } catch (error) {
          console.error('Error fetching payments:', error);
          setPayments([]);
        }
      } else {
        setPayments([]);
      }
      setIsLoading(false);
    };
    fetchPayments();
  }, [user]);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      default: return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="default">Completed</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/profile" className="text-slate-400 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Payment History</h1>
          <p className="text-sm text-slate-400">View your payment records and subscription transactions</p>
        </div>
      </div>

      <Card className="border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                <CreditCard className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Current Plan</p>
                <p className="text-lg font-semibold text-white capitalize">
                  {user?.subscription_status || 'Free'}
                </p>
              </div>
            </div>
            {user?.subscription_status !== 'premium' && (
              <Link href="/subscription">
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Receipt className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No payment records found</p>
              <p className="text-sm text-slate-500">Your payment history will appear here after you make a purchase.</p>
              <Link href="/subscription" className="inline-block mt-4">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">View Plans</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment, i) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg border border-slate-800 p-4 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {statusIcon(payment.status)}
                    <div>
                      <p className="text-sm font-medium text-white">{payment.description}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(payment.paid_at || payment.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      {payment.metadata?.transaction_ref && (
                        <p className="text-xs text-slate-500 font-mono mt-1">Ref: {payment.metadata.transaction_ref}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{payment.currency} {payment.amount.toFixed(2)}</p>
                    <div className="mt-1">{statusBadge(payment.status)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}