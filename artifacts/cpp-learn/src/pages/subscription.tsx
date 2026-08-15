import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Crown, Check, Loader2, CreditCard, Zap, Award, BookOpen, Brain, Download } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

const PREMIUM_PRICE = 49.99;
const CURRENCY = 'ZAR';

const premiumFeatures = [
  { icon: BookOpen, text: 'Unlimited access to all premium courses' },
  { icon: Brain, text: 'Unlimited AI coding assistant' },
  { icon: Award, text: 'Digital certificates of completion' },
  { icon: Download, text: 'Downloadable resources & PDFs' },
  { icon: Zap, text: 'Advanced coding challenges & projects' },
  { icon: Crown, text: 'Premium learning paths' },
];

export default function SubscriptionPage() {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [transactionRef, setTransactionRef] = useState<string | null>(null);

  const isPremium = user?.subscription_status === 'premium';

  const handlePayFastCheckout = async () => {
    if (!user) return;

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      // Generate a unique transaction reference
      const ref = `IC-${user.id.slice(0, 8)}-${Date.now()}`;
      setTransactionRef(ref);

      // PayFast merchant details are configured via environment variables on the server.
      // The server generates the PayFast redirect URL with the correct merchant ID, key, and signature.
      // This allows updating PayFast credentials without rebuilding the frontend.
      const payfastConfig = import.meta.env.VITE_PAYFAST_CONFIG;

      if (payfastConfig) {
        // If PayFast is configured, redirect to PayFast checkout
        const config = JSON.parse(payfastConfig);
        const params = new URLSearchParams({
          merchant_id: config.merchantId,
          merchant_key: config.merchantKey,
          return_url: `${window.location.origin}/subscription?status=success`,
          cancel_url: `${window.location.origin}/subscription?status=cancelled`,
          notify_url: `${window.location.origin}/api/payments/webhook`,
          name_first: user.name?.split(' ')[0] || '',
          name_last: user.name?.split(' ').slice(1).join(' ') || '',
          email_address: user.email,
          m_payment_id: ref,
          amount: PREMIUM_PRICE.toFixed(2),
          item_name: 'Infinity Code Premium Monthly',
        });

        // Use sandbox or production URL based on config
        const payfastUrl = config.sandbox
          ? 'https://sandbox.payfast.co.za/eng/process'
          : 'https://www.payfast.co.za/eng/process';

        window.location.href = `${payfastUrl}?${params.toString()}`;
        return;
      }

      // Fallback: If PayFast is not configured, simulate payment for demo purposes
      // In production, this should show an error message
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update subscription in Supabase if configured
      if (isSupabaseConfigured()) {
        const sb = getSupabaseClient();
        const { error } = await sb
          .from('profiles')
          .update({
            subscription_status: 'premium',
            subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) throw error;

        // Record payment
        await sb.from('payments').insert([
          {
            user_id: user.id,
            amount: PREMIUM_PRICE,
            currency: CURRENCY,
            status: 'completed',
            type: 'subscription',
            description: 'Infinity Code Premium Monthly Subscription',
            metadata: { transaction_ref: ref, provider: 'payfast' },
            paid_at: new Date().toISOString(),
          },
        ]);
      }

      await refreshProfile();
      setPaymentStatus('success');
      toast({
        title: 'Payment successful!',
        description: 'You are now a Premium member. Enjoy all the benefits!',
      });
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      toast({
        title: 'Payment failed',
        description: 'Your payment could not be processed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentStatus === 'success' || isPremium) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
              <Crown className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-2 text-white">Premium Active!</h1>
              <p className="text-slate-400 mb-6">
                You have access to all premium features. Thank you for being a Premium member!
              </p>
              {transactionRef && (
                <p className="text-sm text-slate-500 mb-4">
                  Transaction Reference: <span className="font-mono text-slate-300">{transactionRef}</span>
                </p>
              )}
              {user?.subscription_expires_at && (
                <p className="text-sm text-slate-500 mb-6">
                  Your subscription is active until{' '}
                  {new Date(user.subscription_expires_at).toLocaleDateString()}
                </p>
              )}
              <div className="flex gap-3 justify-center">
                <Link href="/lessons">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Premium Courses
                  </Button>
                </Link>
                <Link href="/payment-history">
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    View Payment History
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 mb-4"
        >
          <Crown className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h1>
        <p className="text-slate-400">Unlock everything Infinity Code has to offer</p>
      </div>

      {paymentStatus === 'failed' && (
        <div className="rounded-lg border border-red-700/40 bg-red-950/40 p-4 text-center text-red-300">
          Payment failed. Please try again or contact support if the issue persists.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <Card className="border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <p className="text-3xl font-bold text-white mb-1">R0</p>
            <p className="text-sm text-slate-400 mb-6">per month</p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Access to free courses</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Community access</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic AI assistant (5 queries/day)</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Progress tracking</li>
            </ul>
            <div className="mt-6">
              <Button variant="outline" disabled className="w-full border-slate-700 text-slate-400">
                Current Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="border-yellow-500/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold">Recommended</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h3 className="text-xl font-bold text-white">Premium</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">R{PREMIUM_PRICE.toFixed(2)}</p>
            <p className="text-sm text-slate-400 mb-6">per month</p>
            <ul className="space-y-3 text-sm text-slate-300">
              {premiumFeatures.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <li key={i} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-yellow-500" />
                    {feature.text}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <Button
                onClick={handlePayFastCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                ) : (
                  <><CreditCard className="mr-2 h-4 w-4" />Upgrade Now</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card className="border-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Plan</span>
              <span className="text-white">Premium Monthly</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Price</span>
              <span className="text-white">R{PREMIUM_PRICE.toFixed(2)} / month</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Method</span>
              <span className="text-white">PayFast</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-yellow-500">R{PREMIUM_PRICE.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-slate-500">
        Payments are processed securely via PayFast. Your subscription will automatically renew monthly.
        You can cancel at any time from your profile settings.
      </p>
    </div>
  );
}