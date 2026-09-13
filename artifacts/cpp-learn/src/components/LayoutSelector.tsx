import { ReactNode } from 'react';
import { useUser } from '@/context/UserContext';
import BeginnerLayout from './layouts/BeginnerLayout';
import IntermediateLayout from './layouts/IntermediateLayout';
import ExpertLayout from './layouts/ExpertLayout';

interface LayoutSelectorProps {
  children: ReactNode;
  // Layout-specific props
  onPrevious?: () => void;
  onNext?: () => void;
  onShowHint?: () => void;
  showHintButton?: boolean;
  progressPercent?: number;
  lessonsList?: Array<{ id: string; title: string; completed: boolean }>;
  onLessonSelect?: (id: string) => void;
  currentLessonId?: string;
  onRunCode?: () => void;
  onResetCode?: () => void;
  consoleOutput?: string;
  files?: Array<{ id: string; name: string; type: 'file' | 'folder' }>;
  onFileSelect?: (id: string) => void;
  terminalOutput?: string;
  documentationContent?: ReactNode;
}

export function LayoutSelector({
  children,
  onPrevious,
  onNext,
  onShowHint,
  showHintButton,
  progressPercent,
  lessonsList,
  onLessonSelect,
  currentLessonId,
  onRunCode,
  onResetCode,
  consoleOutput,
  files,
  onFileSelect,
  terminalOutput,
  documentationContent,
}: LayoutSelectorProps) {
  const { user } = useUser();

  // Default to beginner if no level set
  const level = user?.level || 'BEGINNER';

  switch (level) {
    case 'BEGINNER':
      return (
        <BeginnerLayout
          onPrevious={onPrevious}
          onNext={onNext}
          onShowHint={onShowHint}
          showHintButton={showHintButton}
          progressPercent={progressPercent}
        >
          {children}
        </BeginnerLayout>
      );

    case 'INTERMEDIATE':
      return (
        <IntermediateLayout
          lessonsList={lessonsList}
          onLessonSelect={onLessonSelect}
          currentLessonId={currentLessonId}
          onRunCode={onRunCode}
          onResetCode={onResetCode}
          consoleOutput={consoleOutput}
        >
          {children}
        </IntermediateLayout>
      );

    case 'EXPERT':
      return (
        <ExpertLayout
          files={files}
          onFileSelect={onFileSelect}
          onRunCode={onRunCode}
          terminalOutput={terminalOutput}
          documentationContent={documentationContent}
        >
          {children}
        </ExpertLayout>
      );

    default:
      // Fallback to beginner
      return (
        <BeginnerLayout
          onPrevious={onPrevious}
          onNext={onNext}
          onShowHint={onShowHint}
          showHintButton={showHintButton}
          progressPercent={progressPercent}
        >
          {children}
        </BeginnerLayout>
      );
  }
}
