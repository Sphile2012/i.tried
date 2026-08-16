/**
 * Infinity Code - Community Page
 * Developer posts, discussions, questions, and answers
 */

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Plus,
  Filter,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Bookmark,
  Share2,
  MoreHorizontal,
  Search,
} from 'lucide-react';

interface Post {
  id: number;
  type: 'Discussion' | 'Question' | 'Showcase' | 'Tutorial';
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: Date;
  likes: number;
  comments: number;
  tags: string[];
}

const typeColors: Record<string, string> = {
  Question: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Showcase: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Tutorial: 'bg-green-500/20 text-green-400 border-green-500/30',
  Discussion: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export default function CommunityPage() {
  const { user } = useAuth();
  const [showNewPost, setShowNewPost] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostType, setNewPostType] = useState<Post['type']>('Discussion');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  const filters = ['All', 'Discussion', 'Question', 'Showcase', 'Tutorial'];
  const filtered = activeFilter === 'All' ? posts : posts.filter(p => p.type === activeFilter);

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      type: newPostType,
      title: newPostTitle,
      content: newPostContent,
      author: (user as any)?.user_metadata?.full_name || 'Anonymous',
      authorAvatar: ((user as any)?.user_metadata?.full_name || 'A').charAt(0).toUpperCase(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      tags: newPostTags.split(',').map(t => t.trim()).filter(Boolean),
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setShowNewPost(false);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Community</h1>
            <p className="text-slate-400">Ask questions, share projects, and connect with developers.</p>
          </div>
          <Button
            onClick={() => setShowNewPost(!showNewPost)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="bg-slate-900/50 border-slate-800 mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">Create New Post</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Type</label>
                  <select
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value as Post['type'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Discussion">Discussion</option>
                    <option value="Question">Question</option>
                    <option value="Showcase">Showcase</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Title</label>
                  <Input
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Content</label>
                <Textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your post content..."
                  rows={5}
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Tags (comma separated)</label>
                <Input
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="react, typescript, help"
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Publish Post
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewPost(false)}
                  className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex items-center gap-2 mr-4">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-400">Filter:</span>
          </div>
          {filters.map((f) => (
            <Button
              key={f}
              variant={activeFilter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(f)}
              className={
                activeFilter === f
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Posts List */}
        {filtered.length === 0 ? (
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
              <p className="text-slate-400 mb-6">Be the first to start a discussion in the community!</p>
              <Button
                onClick={() => setShowNewPost(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((post) => (
              <Card
                key={post.id}
                className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {post.authorAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge className={typeColors[post.type] || typeColors.Discussion}>
                          {post.type}
                        </Badge>
                        <span className="text-xs text-slate-500">by {post.author}</span>
                        <span className="text-xs text-slate-600">• {formatTimeAgo(post.createdAt)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition mb-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-slate-800 text-slate-400">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <button className="flex items-center gap-1 hover:text-white transition">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition">
                          <Bookmark className="h-4 w-4" />
                          Save
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                        <button className="ml-auto hover:text-white transition">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}