import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppLayout } from '@/components/layout/app-layout';
import ProtectedRoute from '@/components/ProtectedRoute';

// Pages
import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';
import Dashboard from '@/pages/dashboard';
import LessonBrowser from '@/pages/lessons';
import LessonDetail from '@/pages/lesson-detail';
import QuizPage from '@/pages/quiz';
import GlossaryList from '@/pages/glossary';
import GlossaryTerm from '@/pages/glossary-term';
import FullPlayground from '@/pages/playground';
import AchievementsPage from '@/pages/achievements';
import FlashcardsPage from '@/pages/flashcards';
import AITutorPage from '@/pages/ai-tutor';
import AIStudyPlanner from '@/pages/ai-study-planner';
import LearningHubPage from '@/pages/learning-hub';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import ForgotPasswordPage from '@/pages/forgot-password';
import ResetPasswordPage from '@/pages/reset-password';
import ProfilePage from '@/pages/profile';
import SubscriptionPage from '@/pages/subscription';
import PaymentHistoryPage from '@/pages/payment-history';
import AdminDashboardPage from '@/pages/admin-dashboard';
import ChallengesPage from '@/pages/challenges';
import CommunityPage from '@/pages/community';
import ResourcesPage from '@/pages/resources';
import SettingsPage from '@/pages/settings';
import LeaderboardPage from '@/pages/leaderboard';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: false } },
});

function Router() {
  return (
    <Switch>
      {/* Auth routes - no layout */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      {/* App routes - with layout */}
      <Route>
        <AppLayout>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/lessons" component={LessonBrowser} />
            <Route path="/lessons/:id" component={LessonDetail} />
            <Route path="/quiz/:lessonId" component={QuizPage} />
            <Route path="/glossary" component={GlossaryList} />
            <Route path="/glossary/:slug" component={GlossaryTerm} />
            <Route path="/playground" component={FullPlayground} />
            <Route path="/ai-tutor" component={AITutorPage} />
            <Route path="/ai-study-planner" component={AIStudyPlanner} />
            <Route path="/learning-hub" component={LearningHubPage} />
            <Route path="/achievements" component={AchievementsPage} />
            <Route path="/flashcards" component={FlashcardsPage} />
            <Route path="/challenges" component={ChallengesPage} />
            <Route path="/community" component={CommunityPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/leaderboard" component={LeaderboardPage} />
            {/* Protected routes */}
            <Route path="/profile">
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Route>
            <Route path="/subscription">
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            </Route>
            <Route path="/payment-history">
              <ProtectedRoute>
                <PaymentHistoryPage />
              </ProtectedRoute>
            </Route>
            <Route path="/admin">
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            </Route>
            <Route path="/settings">
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;