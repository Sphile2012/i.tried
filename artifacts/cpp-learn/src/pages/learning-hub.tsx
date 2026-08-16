import { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Pin, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const topics = [
  { id: 1, title: 'How do pointers work in C++?', author: 'Alice', replies: 12, likes: 24, category: 'C++', pinned: true, createdAt: '2 hours ago' },
  { id: 2, title: 'Best resources for learning React', author: 'Bob', replies: 8, likes: 15, category: 'React', pinned: false, createdAt: '5 hours ago' },
  { id: 3, title: 'Help with binary search algorithm', author: 'Charlie', replies: 5, likes: 10, category: 'Algorithms', pinned: false, createdAt: '1 day ago' },
  { id: 4, title: 'Share your latest project!', author: 'Eve', replies: 23, likes: 45, category: 'Showcase', pinned: false, createdAt: '2 days ago' },
];

const projects = [
  { id: 1, title: 'Todo App in C++', author: 'Alice', description: 'A command-line todo application using classes and file I/O.', likes: 32, tags: ['C++', 'CLI'] },
  { id: 2, title: 'Weather Dashboard', author: 'Bob', description: 'React app showing weather data from a public API.', likes: 28, tags: ['React', 'API'] },
  { id: 3, title: 'Sorting Visualizer', author: 'Charlie', description: 'Visualizes bubble sort, merge sort, and quick sort.', likes: 41, tags: ['Algorithms', 'Visualization'] },
];

export default function LearningHub() {
  const [search, setSearch] = useState('');
  const filteredTopics = topics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold mb-2">Community</h1><p className="text-slate-400">Ask questions, share projects, and learn together</p></div>
        <Button><MessageCircle className="h-4 w-4 mr-2" />New Topic</Button>
      </div>
      <Tabs defaultValue="discussions">
        <TabsList>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="discussions" className="space-y-4">
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search discussions..." className="pl-10" /></div>
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="hover:border-blue-500/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {topic.pinned && <Pin className="h-4 w-4 text-blue-400 mt-1" />}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>by {topic.author}</span><span>{topic.createdAt}</span><Badge variant="secondary">{topic.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" />{topic.replies}</span>
                    <span className="flex items-center gap-1"><Heart className="h-4 w-4" />{topic.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-blue-500/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">{project.tags.map((tag, i) => <Badge key={i} variant="outline">{tag}</Badge>)}</div>
                  <div className="flex items-center gap-4 text-sm text-slate-400"><span className="flex items-center gap-1"><Heart className="h-4 w-4" />{project.likes}</span><span>by {project.author}</span></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="members">
          <Card><CardContent className="p-8 text-center text-slate-400">Member list coming soon...</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
