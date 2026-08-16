import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Crown, Check, Loader2, CreditCard, Zap, Award, BookOpen, Brain, Download, Star, TrendingUp, Target, Shield, Rocket, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';

const PREMIUM_PRICE = 49.99;
const PRO_PRICE = 89.99;
const CURRENCY = 'ZAR';
const TRIAL_DAYS = 7;

type PlanType = 'premium' | 'pro';

const premiumFeatures = [
  { icon: BookOpen, text: 'Unlimited access to all core courses' },
  { icon: Brain, text: 'Unlimited AI coding assistant' },
  { icon: Award, text: 'Digital certificates of completion' },
  { icon: Download, text: 'Downloadable resources & PDFs' },
  { icon: Zap, text: 'Coding challenges & projects' },
  { icon: Crown, text: 'Premium learning paths' },
  { icon: Target, text: 'Progress tracking & analytics' },
  { icon: Shield, text: '7-day free trial' },
];

const proFeatures = [
  { icon: BookOpen, text: 'Everything in Premium, plus:' },
  { icon: Rocket, text: 'Advanced C++ topics & deep dives' },
  { icon: Brain, text: 'Advanced AI with code review' },
  { icon: Zap, text: 'Difficult coding & debugging challenges' },
  { icon: Target, text: 'Advanced performance analytics' },
  { icon: Award, text: 'Interview preparation materials' },
  { icon: Star, text: 'Advanced projects & case studies' },
  { icon: TrendingUp, text: 'Priority support & early features' },
];

export default function SubscriptionPage() {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [transactionRef, setTransactionRef] = useState<string | null>(null);

  const isPremium = user?.subscription_status === 'premium';
  const isPro = user?.subscription_status === 'pro';
  const isOnTrial = user?.trial_status === 'active';
  const trialEndsAt = user?.trial_ends_at ? new Date(user.trial_ends_at) : null;
  const isTrialExpired = trialEndsAt && new Date() > trialEndsAt;

  // Check URL params for payment status
  const urlParams = new URLSearchParams(window.location.search);
  const paymentResult = urlParams.get('status');
  const planFromUrl = urlParams.get('plan') as PlanType | null;

  const handlePayFastCheckout = async (plan: PlanType) => {
    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to start a subscription.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedPlan(plan);
    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      const price = plan === 'premium' ? PREMIUM_PRICE : PRO_PRICE;
      const planName = plan === 'premium' ? 'Infinity Code Premium' : 'Infinity Code Pro';
      const ref = `IC-${user.id.slice(0, 8)}-${plan}-${Date.now()}`;
      setTransactionRef(ref);

      // Start trial in Supabase
      if (isSupabaseConfigured()) {
        const sb = getSupabaseClient();
        const trialEnds = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString();
        
        const { error } = await sb
          .from('profiles')
          .update({
            subscription_status: plan,
            subscription_expires_at: trialEnds,
            trial_status: 'active',
            trial_ends_at: trialEnds,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) throw error;
      }

      // PayFast merchant details are configured via environment variables
      const payfastConfig = import.meta.env.VITE_PAYFAST_CONFIG;

      if (payfastConfig) {
        const config = JSON.parse(payfastConfig);
        const params = new URLSearchParams({
          merchant_id: config.merchantId,
          merchant_key: config.merchantKey,
          return_url: `${window.location.origin}/subscription?status=success&plan=${plan}`,
          cancel_url: `${window.location.origin}/subscription?status=cancelled&plan=${plan}`,
          notify_url: `${window.location.origin}/api/payments/webhook`,
          name_first: user.name?.split(' ')[0] || '',
          name_last: user.name?.split(' ').slice(1).join(' ') || '',
          email_address: user.email,
          m_payment_id: ref,
          amount: price.toFixed(2),
          item_name: `${planName} Monthly Subscription`,
          recurring_type: '1', // Subscription
        });

        const payfastUrl = config.sandbox
          ? 'https://sandbox.payfast.co.za/eng/process'
          : 'https://www.payfast.co.za/eng/process';

        window.location.href = `${payfastUrl}?${params.toString()}`;
        return;
      }

      // Demo mode - simulate trial activation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await refreshProfile();
      setPaymentStatus('success');
      toast({
        title: 'Trial activated!',
        description: `Your ${TRIAL_DAYS}-day free trial of ${planName} has started.`,
      });
    } catch (error) {
      console.error('Trial error:', error);
      setPaymentStatus('failed');
      toast({
        title: 'Trial activation failed',
        description: 'Could not start your trial. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful payment return
  if (paymentResult === 'success' || isPremium || isPro) {
    const currentPlan = isPro ? 'Pro' : 'Premium';
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
              <Crown className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-2 text-white">{currentPlan} Active!</h1>
              <p className="text-slate-400 mb-6">
                You have access to all {currentPlan.toLowerCase()} features. Thank you for being a {currentPlan} member!
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
              {isOnTrial && trialEndsAt && !isTrialExpired && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-400">
                    🎉 You're on a free trial! First payment will be charged on{' '}
                    {trialEndsAt.toLocaleDateString()}.
                  </p>
                </div>
              )}
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/lessons">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Courses
                  </Button>
                </Link>
                <Link href="/payment-history">
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    View Payment History
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    Manage Subscription
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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 mb-4"
        >
          <Crown className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
        <p className="text-slate-400">Start your {TRIAL_DAYS}-day free trial today. No commitment.</p>
      </div>

      {/* Trial Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3"
      >
        <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-slate-300">
          <p className="font-semibold text-blue-400 mb-1">🎉 {TRIAL_DAYS}-Day Free Trial</p>
          <p>Start with full access to your chosen plan. You won't be charged until your trial ends. Cancel anytime.</p>
        </div>
      </motion.div>

      {paymentStatus === 'failed' && (
        <div className="rounded-lg border border-red-700/40 bg-red-950/40 p-4 text-center text-red-300">
          Payment failed. Please try again or contact support if the issue persists.
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-slate-800 hover:border-blue-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Premium</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-1">R{PREMIUM_PRICE.toFixed(2)}</p>
              <p className="text-sm text-slate-400 mb-6">per month after trial</p>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                {premiumFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
              <Button
                onClick={() => handlePayFastCheckout('premium')}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                size="lg"
              >
                {isLoading && selectedPlan === 'premium' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                ) : (
                  <><CreditCard className="mr-2 h-4 w-4" />Start Free Trial</>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-yellow-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-semibold">
                Most Popular
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Pro</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-1">R{PRO_PRICE.toFixed(2)}</p>
              <p className="text-sm text-slate-400 mb-6">per month after trial</p>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                {proFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
              <Button
                onClick={() => handlePayFastCheckout('pro')}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold"
                size="lg"
              >
                {isLoading && selectedPlan === 'pro' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</>
                ) : (
                  <><CreditCard className="mr-2 h-4 w-4" />Start Free Trial</>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* What's Included */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Premium Includes</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> All core programming courses</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Interactive glossary & explanations</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Quizzes & coding challenges</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Progress tracking & XP system</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Completion certificates</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" /> Code Studio playground</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Pro Adds</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Advanced C++ deep dives</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Difficult debugging challenges</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Interview preparation</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Advanced analytics</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Priority support</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-500" /> Early access to new features</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="border-slate-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-white mb-1">How does the free trial work?</p>
              <p className="text-sm text-slate-400">You get full access to your chosen plan for {TRIAL_DAYS} days. No payment required until the trial ends. Cancel anytime before day {TRIAL_DAYS} to avoid charges.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Can I switch plans later?</p>
              <p className="text-sm text-slate-400">Yes! You can upgrade from Premium to Pro at any time from your account settings. The difference will be prorated.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">What payment methods do you accept?</p>
              <p className="text-sm text-slate-400">We accept all major credit cards, instant EFT, and other payment methods through PayFast, South Africa's trusted payment gateway.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Can I cancel anytime?</p>
              <p className="text-sm text-slate-400">Absolutely. You can cancel your subscription at any time from your profile settings. You'll retain access until the end of your billing period.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-slate-500">
        Payments are processed securely via PayFast. Your subscription will automatically renew monthly after the trial.
        You can cancel at any time from your profile settings. By starting a trial, you agree to our Terms of Service.
      </p>
    </div>
  );
}