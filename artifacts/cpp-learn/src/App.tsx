import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppLayout } from '@/components/layout/app-layout';

// Pages
import HomePage from '@/pages/home';
import HomeNew from '@/pages/home-new';
import AboutPage from '@/pages/about';
import Dashboard from '@/pages/dashboard';
import LessonBrowser from '@/pages/lessons';
import LearnPath from '@/pages/learn-path';
import LessonDetail from '@/pages/lesson-detail';
import LessonReader from '@/pages/lesson-reader';
import QuizPage from '@/pages/quiz';
import GlossaryList from '@/pages/glossary';
import GlossaryTerm from '@/pages/glossary-term';
import FullPlayground from '@/pages/playground';
import CodeComparison from '@/pages/code-comparison';
import AchievementsPage from '@/pages/achievements';
import FlashcardsPage from '@/pages/flashcards';
import AITutorPage from '@/pages/ai-tutor';
import AIStudyPlanner from '@/pages/ai-study-planner';
import LearningHubPage from '@/pages/learning-hub';
import BeginnerGuidesPage from '@/pages/beginner-guides';
import ProfilePage from '@/pages/profile';
import ProfileMultiLang from '@/pages/profile-multilang';
import PortfolioPage from '@/pages/portfolio';
import DownloadPage from '@/pages/download';
import ChallengesPage from '@/pages/challenges';
import CommunityPage from '@/pages/community';
import ResourcesPage from '@/pages/resources';
import SettingsPage from '@/pages/settings';
import LeaderboardPage from '@/pages/leaderboard';
import LoginPage from '@/pages/auth/login';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: false } },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={HomeNew} />
        <Route path="/home-old" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/learn" component={LearnPath} />
        <Route path="/lessons" component={LessonBrowser} />
        <Route path="/lessons/:id" component={LessonDetail} />
        <Route path="/lesson-reader" component={LessonReader} />
        <Route path="/quiz/:lessonId" component={QuizPage} />
        <Route path="/glossary" component={GlossaryList} />
        <Route path="/glossary/:slug" component={GlossaryTerm} />
        <Route path="/playground" component={FullPlayground} />
        <Route path="/code-comparison" component={CodeComparison} />
        <Route path="/ai-tutor" component={AITutorPage} />
        <Route path="/ai-study-planner" component={AIStudyPlanner} />
        <Route path="/learning-hub" component={LearningHubPage} />
        <Route path="/beginner-guides" component={BeginnerGuidesPage} />
        <Route path="/achievements" component={AchievementsPage} />
        <Route path="/flashcards" component={FlashcardsPage} />
        <Route path="/challenges" component={ChallengesPage} />
        <Route path="/community" component={CommunityPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/download" component={DownloadPage} />
        <Route path="/profile" component={ProfileMultiLang} />
        <Route path="/profile-old" component={ProfilePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
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