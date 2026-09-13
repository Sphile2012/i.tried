/**
 * Friends Page
 * Search for users, send friend requests, view friends list with online status
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Search,
  UserPlus,
  UserMinus,
  Check,
  X,
  Share2,
  Copy,
  Mail,
  Clock,
  Circle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Friend {
  id: string;
  username: string;
  displayName?: string;
  level?: string;
  xp?: number;
  online?: boolean;
  lastSeen?: string;
  status: 'accepted' | 'pending' | 'received';
}

export default function FriendsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const inviteLink = `${window.location.origin}/invite/${user?.username || ''}`;

  // Fetch friends list
  useEffect(() => {
    if (user) {
      fetchFriends();
    }
  }, [user]);

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/friends', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data.friends || []);
        setPendingRequests(data.pending || []);
        setReceivedRequests(data.received || []);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const searchUsers = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.users || []);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (targetUserId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (response.ok) {
        toast({
          title: 'Friend request sent',
          description: 'Your friend request has been sent successfully.',
        });
        fetchFriends();
        searchUsers(); // Refresh search results
      } else {
        const error = await response.json();
        toast({
          title: 'Failed to send request',
          description: error.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send friend request.',
        variant: 'destructive',
      });
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/accept/${requestId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Friend request accepted',
          description: 'You are now friends!',
        });
        fetchFriends();
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/reject/${requestId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Request declined',
          description: 'Friend request has been declined.',
        });
        fetchFriends();
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const removeFriend = async (friendId: string) => {
    if (!confirm('Are you sure you want to remove this friend?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Friend removed',
          description: 'Friend has been removed from your list.',
        });
        fetchFriends();
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: 'Link copied!',
      description: 'Your invite link has been copied to clipboard.',
    });
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Join me on Infinity Code!');
    const body = encodeURIComponent(
      `I'm learning to code on Infinity Code and thought you might be interested too!\n\nJoin me here: ${inviteLink}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const getOnlineStatus = (friend: Friend) => {
    if (friend.online) {
      return (
        <span className="flex items-center gap-1.5 text-xs text-green-400">
          <Circle className="w-2 h-2 fill-green-400" />
          Online
        </span>
      );
    }
    if (friend.lastSeen) {
      return (
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {friend.lastSeen}
        </span>
      );
    }
    return null;
  };

  const isFriend = (userId: string) => {
    return friends.some((f) => f.id === userId);
  };

  const hasPendingRequest = (userId: string) => {
    return pendingRequests.some((f) => f.id === userId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-[#00d4ff]" />
            Friends
          </h1>
          <p className="text-slate-400 mt-1">
            Connect with other learners and grow together
          </p>
        </div>
        <Button
          onClick={() => setShareModalOpen(true)}
          className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white hover:opacity-90"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share My Link
        </Button>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Share Your Invite Link</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Share this link with friends to invite them to Infinity Code
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 mb-4 break-all text-sm text-slate-300">
              {inviteLink}
            </div>
            <div className="flex gap-3">
              <Button onClick={copyInviteLink} className="flex-1" variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button onClick={shareViaEmail} className="flex-1" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="friends" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="friends">
            Friends ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="requests">
            Requests ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        {/* Friends List */}
        <TabsContent value="friends" className="space-y-4">
          {friends.length === 0 ? (
            <Card className="border-slate-800">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No friends yet</h3>
                <p className="text-slate-400 mb-4">
                  Search for users or share your invite link to connect with others
                </p>
                <Button
                  onClick={() => setShareModalOpen(true)}
                  className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white"
                >
                  Share My Link
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {friends.map((friend) => (
                <Card key={friend.id} className="border-slate-800 hover:border-slate-700 transition">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                          {friend.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">
                            {friend.displayName || friend.username}
                          </h3>
                          <p className="text-sm text-slate-400">@{friend.username}</p>
                          {getOnlineStatus(friend)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFriend(friend.id)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                    {friend.level && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Level</span>
                          <span className="text-[#00d4ff] font-semibold">{friend.level}</span>
                        </div>
                        {friend.xp && (
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-slate-400">XP</span>
                            <span className="text-white">{friend.xp.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Friend Requests */}
        <TabsContent value="requests" className="space-y-4">
          {receivedRequests.length === 0 ? (
            <Card className="border-slate-800">
              <CardContent className="p-12 text-center">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No pending requests</h3>
                <p className="text-slate-400">
                  You don't have any friend requests at the moment
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {receivedRequests.map((request) => (
                <Card key={request.id} className="border-slate-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                          {request.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {request.displayName || request.username}
                          </h3>
                          <p className="text-sm text-slate-400">@{request.username}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => acceptFriendRequest(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => rejectFriendRequest(request.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Search Users */}
        <TabsContent value="search" className="space-y-4">
          <Card className="border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Search for Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Enter username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
                    className="pl-10 bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <Button onClick={searchUsers} disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map((result) => (
                <Card key={result.id} className="border-slate-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold">
                          {result.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {result.displayName || result.username}
                          </h3>
                          <p className="text-sm text-slate-400">@{result.username}</p>
                        </div>
                      </div>
                      {result.id !== user?.id && (
                        <div>
                          {isFriend(result.id) ? (
                            <span className="text-sm text-green-400 flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              Friends
                            </span>
                          ) : hasPendingRequest(result.id) ? (
                            <span className="text-sm text-slate-400">Request Sent</span>
                          ) : (
                            <Button
                              onClick={() => sendFriendRequest(result.id)}
                              size="sm"
                              className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-white"
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Add Friend
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchQuery && !loading && searchResults.length === 0 && (
            <Card className="border-slate-800">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No users found</h3>
                <p className="text-slate-400">
                  Try searching with a different username
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
