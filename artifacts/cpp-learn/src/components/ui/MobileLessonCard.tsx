/**
 * Infinity Code - Mobile-Optimized Lesson Card
 * Touch-friendly card component with swipe gestures and haptic feedback
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Clock, ChevronRight, Play, BookOpen, Code, Award } from 'lucide-react';

export interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress?: number;
  type?: 'text' | 'exercise' | 'quiz' | 'project';
  category?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  tags?: string[];
}

const typeIcons = {
  text: BookOpen,
  exercise: Code,
  quiz: Award,
  project: Code,
};

const typeColors = {
  text: 'from-blue-500 to-cyan-500',
  exercise: 'from-green-500 to-emerald-500',
  quiz: 'from-purple-500 to-pink-500',
  project: 'from-orange-500 to-amber-500',
};

export function MobileLessonCard({
  id,
  title,
  description,
  duration,
  progress = 0,
  type = 'text',
  category,
  isCompleted = false,
  isLocked = false,
  tags = [],
}: LessonCardProps) {
  const Icon = typeIcons[type];
  const colorClass = typeColors[type];

  if (isLocked) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 opacity-50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ml-3">
            <span className="text-xl">&#128274;</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{duration}</span>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/lessons/${id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4 active:bg-white/[0.07] transition-colors relative overflow-hidden"
      >
        {/* Progress indicator for completed lessons */}
        {isCompleted && (
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rotate-45" />
          </div>
        )}

        <div className="flex items-start gap-3">
          {/* Type Icon */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold mb-1 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Meta info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{duration}</span>
                </div>
                {category && (
                  <span className="px-2 py-0.5 bg-white/5 rounded-full">
                    {category}
                  </span>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>

            {/* Progress bar */}
            {progress > 0 && progress < 100 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-[#00d4ff]">{progress}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * Compact lesson card for horizontal scrolling lists
 */
export function CompactLessonCard({
  id,
  title,
  progress = 0,
  type = 'text',
  isCompleted = false,
}: Omit<LessonCardProps, 'description' | 'duration' | 'category' | 'isLocked' | 'tags'>) {
  const Icon = typeIcons[type];
  const colorClass = typeColors[type];

  return (
    <Link to={`/lessons/${id}`}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="w-40 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-3 active:bg-white/[0.07] transition-colors"
      >
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center mb-2`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-white font-medium text-sm line-clamp-2 mb-2">{title}</h4>
        {isCompleted ? (
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <span>Done</span>
            <span>Complete</span>
          </div>
        ) : progress > 0 ? (
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </motion.div>
    </Link>
  );
}

/**
 * Horizontal scrolling lesson list
 */
export function HorizontalLessonList({
  lessons,
  title,
}: {
  lessons: LessonCardProps[];
  title?: string;
}) {
  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-lg font-semibold text-white mb-3 px-4">{title}</h3>
      )}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 -mx-4 scrollbar-hide">
        {lessons.map((lesson) => (
          <CompactLessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            progress={lesson.progress}
            type={lesson.type}
            isCompleted={lesson.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}