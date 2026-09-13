/**
 * Inbox Page - Direct messaging between friends
 */

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import {
  Mail,
  Send,
  Search,
  ArrowLeft,
  Circle,
  Clock,
  Check,
  CheckCheck,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

interface Conversation {
  friendId: string;
  friendUsername: string;
  friendDisplayName?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  online?: boolean;
}

export default function InboxPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch conversations list
  useEffect(() => {
    if (user) {
      fetchConversations();
      // Poll for new messages every 5 seconds
      const interval = setInterval(fetchConversations, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Fetch messages when friend is selected
  useEffect(() => {
    if (selectedFriend) {
      fetchMessages(selectedFriend.friendId);
      // Mark messages as read
      markAsRead(selectedFriend.friendId);
      // Poll for new messages
      const interval = setInterval(() => fetchMessages(selectedFriend.friendId), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedFriend]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages/conversations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (friendId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/messages/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedFriend || sending) return;

    setSending(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: selectedFriend.friendId,
          content: messageInput.trim(),
        }),
      });

      if (response.ok) {
        setMessageInput('');
        fetchMessages(selectedFriend.friendId);
        fetchConversations();
      } else {
        const error = await response.json();
        toast({
          title: 'Failed to send message',
          description: error.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (friendId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/messages/read/${friendId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.friendUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.friendDisplayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#0A1931]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-[#F5F7FF] flex items-center gap-3">
              <Mail className="w-8 h-8 text-[#38BDF8]" />
              Inbox
            </h1>
            {totalUnread > 0 && (
              <span className="px-3 py-1 bg-[#38BDF8] text-white text-sm font-bold rounded-full">
                {totalUnread} unread
              </span>
            )}
          </div>
          <p className="text-[#F5F7FF]/70">Message your friends directly</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-4 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="bg-[#F5F7FF] border-[#F5F7FF]/20 overflow-hidden flex flex-col">
            <CardContent className="p-4 flex flex-col h-full">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A1931]/40" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1931]/5 border-[#0A1931]/10 text-[#0A1931]"
                />
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-[#0A1931]/20 mx-auto mb-3" />
                    <p className="text-[#0A1931]/60 text-sm">
                      {searchQuery ? 'No conversations found' : 'No messages yet'}
                    </p>
                    <Button
                      onClick={() => setLocation('/friends')}
                      className="mt-4 bg-[#38BDF8] hover:bg-[#0EA5E9] text-white text-sm"
                    >
                      Find Friends
                    </Button>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.friendId}
                      onClick={() => setSelectedFriend(conv)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedFriend?.friendId === conv.friendId
                          ? 'bg-[#38BDF8]/20 border-2 border-[#38BDF8]'
                          : 'bg-[#0A1931]/5 hover:bg-[#0A1931]/10 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-full flex items-center justify-center text-white font-bold">
                            {conv.friendUsername.charAt(0).toUpperCase()}
                          </div>
                          {conv.online && (
                            <Circle className="absolute -bottom-1 -right-1 w-4 h-4 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-[#0A1931] truncate">
                              {conv.friendDisplayName || conv.friendUsername}
                            </h3>
                            {conv.lastMessageTime && (
                              <span className="text-xs text-[#0A1931]/60 ml-2 flex-shrink-0">
                                {formatTime(conv.lastMessageTime)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#0A1931]/70 truncate">
                              {conv.lastMessage || 'No messages yet'}
                            </p>
                            {conv.unreadCount > 0 && (
                              <span className="ml-2 px-2 py-0.5 bg-[#38BDF8] text-white text-xs font-bold rounded-full flex-shrink-0">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="bg-[#F5F7FF] border-[#F5F7FF]/20 overflow-hidden flex flex-col">
            {selectedFriend ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-[#0A1931]/10 bg-[#0A1931]/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFriend(null)}
                        className="lg:hidden text-[#0A1931]"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] rounded-full flex items-center justify-center text-white font-bold">
                        {selectedFriend.friendUsername.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0A1931]">
                          {selectedFriend.friendDisplayName || selectedFriend.friendUsername}
                        </h3>
                        {selectedFriend.online ? (
                          <span className="flex items-center gap-1.5 text-xs text-green-600">
                            <Circle className="w-2 h-2 fill-green-600" />
                            Online
                          </span>
                        ) : (
                          <span className="text-xs text-[#0A1931]/60">Offline</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A1931]/5">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Mail className="w-12 h-12 text-[#0A1931]/20 mx-auto mb-3" />
                      <p className="text-[#0A1931]/60 text-sm">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isSent = message.senderId === user?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isSent
                                ? 'bg-[#38BDF8] text-white'
                                : 'bg-white text-[#0A1931] border border-[#0A1931]/10'
                            }`}
                          >
                            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <div className={`flex items-center gap-1 mt-1 justify-end ${
                              isSent ? 'text-white/70' : 'text-[#0A1931]/60'
                            }`}>
                              <span className="text-xs">
                                {formatMessageTime(message.createdAt)}
                              </span>
                              {isSent && (
                                message.read ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-[#0A1931]/10 bg-white">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="flex-1 min-h-[44px] max-h-[120px] resize-none bg-[#0A1931]/5 border-[#0A1931]/10 text-[#0A1931]"
                      rows={1}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!messageInput.trim() || sending}
                      className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white px-4"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-[#0A1931]/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#0A1931] mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-[#0A1931]/60 text-sm">
                    Choose a friend to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
