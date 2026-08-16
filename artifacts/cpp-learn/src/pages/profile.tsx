import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Camera, 
  Loader2, 
  LogOut, 
  Save, 
  Eye, 
  EyeOff, 
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  const { user, updateProfile, logout, uploadAvatar, updatePassword, resendVerificationEmail } = useAuth();
  const [, navigate] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Profile fields
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Password change fields
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordMessageType, setPasswordMessageType] = useState<'success' | 'error'>('success');

  // Avatar upload
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Email verification
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300"
        >
          <h1 className="text-2xl font-semibold text-white">Authentication required</h1>
          <p className="mt-3 text-sm text-slate-400">Please sign in to view your profile.</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline">Go to login</Link>
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline">Create account</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    const result = await updateProfile({ name, bio });
    if (result.success) {
      setMessage('Profile updated successfully.');
      setMessageType('success');
    } else {
      setMessage(result.error || 'Failed to update profile');
      setMessageType('error');
    }
    setIsSaving(false);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.');
      setMessageType('error');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be less than 5MB.');
      setMessageType('error');
      return;
    }

    setIsUploadingAvatar(true);
    const result = await uploadAvatar(file);
    if (!result.success) {
      setMessage(result.error || 'Failed to upload avatar');
      setMessageType('error');
    }
    setIsUploadingAvatar(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      setPasswordMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match.');
      setPasswordMessageType('error');
      return;
    }

    setIsChangingPassword(true);
    setPasswordMessage(null);
    
    const result = await updatePassword(currentPassword, newPassword);
    if (result.success) {
      setPasswordMessage('Password updated successfully.');
      setPasswordMessageType('success');
      // Clear fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMessage(result.error || 'Failed to update password');
      setPasswordMessageType('error');
    }
    
    setIsChangingPassword(false);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setPasswordMessage(null);
    }, 5000);
  };

  const handleResendVerification = async () => {
    setIsResendingEmail(true);
    const result = await resendVerificationEmail(user.email);
    if (result.success) {
      setMessage(result.message || 'Verification email sent.');
      setMessageType('success');
    } else {
      setMessage(result.error || 'Failed to send verification email');
      setMessageType('error');
    }
    setIsResendingEmail(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">Profile</h1>
            <p className="mt-2 text-sm text-slate-400">Keep your learning profile up to date.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`mb-6 flex items-center gap-2 rounded-lg border p-3 text-sm ${
            messageType === 'success' 
              ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300' 
              : 'border-red-800 bg-red-950/40 text-red-300'
          }`}>
            {messageType === 'success' ? <CheckCircle className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
            {message}
          </div>
        )}

        {/* Avatar Section */}
        <div className="mb-8 flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-700">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3898FF&color=fff&size=200`} 
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <button
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
              aria-label="Change avatar"
            >
              {isUploadingAvatar ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Camera className="h-4 w-4 text-white" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{user.name}</h3>
            <p className="text-sm text-slate-400">@{user.username}</p>
            <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>

        {/* Email Verification Status */}
        {!user.email_verified && (
          <div className="mb-8 rounded-lg border border-yellow-700/40 bg-yellow-950/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-300">Email not verified</p>
                  <p className="text-xs text-yellow-400/80">Please verify your email to unlock all features.</p>
                </div>
              </div>
              <Button
                onClick={handleResendVerification}
                disabled={isResendingEmail}
                variant="outline"
                size="sm"
                className="border-yellow-700/50 text-yellow-300 hover:bg-yellow-900/30"
              >
                {isResendingEmail ? (
                  <><Loader2 className="h-3 w-3 mr-1 animate-spin" />Sending...</>
                ) : (
                  <><RefreshCw className="h-3 w-3 mr-1" />Resend</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium text-white mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block text-white">Name</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="bg-slate-950 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label className="mb-2 block text-white">Username</Label>
                <Input 
                  value={user.username} 
                  disabled 
                  className="bg-slate-950 text-slate-400"
                />
                <p className="mt-1 text-xs text-slate-500">Username cannot be changed.</p>
              </div>
              <div>
                <Label className="mb-2 block text-white">Email</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={user.email} 
                    disabled 
                    className="bg-slate-950 text-slate-400 flex-1"
                  />
                  {user.email_verified && (
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500">Email cannot be changed.</p>
              </div>
              <div>
                <Label className="mb-2 block text-white">Bio</Label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  className="min-h-28 bg-slate-950 text-white" 
                  placeholder="Tell others a bit about your learning goals."
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isSaving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" />Save profile</>
            )}
          </Button>
        </div>

        {/* Password Change Section */}
        <div className="mt-10 pt-10 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-white">Security</h2>
            <Button
              variant="outline"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              <Lock className="h-4 w-4 mr-2" />
              {showPasswordChange ? 'Cancel' : 'Change password'}
            </Button>
          </div>

          {showPasswordChange && (
            <motion.form 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handlePasswordChange}
              className="space-y-4"
            >
              {passwordMessage && (
                <div className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                  passwordMessageType === 'success'
                    ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
                    : 'border-red-800 bg-red-950/40 text-red-300'
                }`}>
                  {passwordMessageType === 'success' ? <CheckCircle className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
                  {passwordMessage}
                </div>
              )}

              <div>
                <Label className="mb-2 block text-white">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input 
                    type={showCurrentPassword ? 'text' : 'password'} 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-12 pl-10 pr-10 bg-slate-950 text-white"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-white">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input 
                    type={showNewPassword ? 'text' : 'password'} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pl-10 pr-10 bg-slate-950 text-white"
                    placeholder="••••••••"
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {newPassword && newPassword.length < 6 && (
                  <p className="mt-1 text-xs text-red-400">Password must be at least 6 characters.</p>
                )}
              </div>

              <div>
                <Label className="mb-2 block text-white">Confirm New Password</Label>
                <Input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 bg-slate-950 text-white"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">Passwords do not match.</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isChangingPassword} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isChangingPassword ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</>
                ) : (
                  'Update password'
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}