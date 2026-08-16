/**
 * Infinity Code - Settings Page
 * Account, security, appearance, notifications, privacy
 */

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Account');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [communityNotifs, setCommunityNotifs] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  const tabs = ['Account', 'Security', 'Appearance', 'Notifications', 'Privacy'];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">Settings</h1>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm rounded-lg transition ${activeTab === tab ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'text-gray-400 hover:text-white'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Account' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-2xl">{user?.name?.[0] || 'D'}</div>
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-sm hover:bg-white/10 transition">Change Avatar</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-sm text-gray-400 mb-1 block">Name</label><input type="text" defaultValue={user?.name || ''} className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]" /></div>
              <div><label className="text-sm text-gray-400 mb-1 block">Username</label><input type="text" defaultValue={user?.username || ''} className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]" /></div>
              <div><label className="text-sm text-gray-400 mb-1 block">Email</label><input type="email" defaultValue={user?.email || ''} className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff]" /></div>
              <div><label className="text-sm text-gray-400 mb-1 block">Bio</label><input type="text" placeholder="Tell us about yourself" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" /></div>
            </div>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">Save Changes</button>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
              <div className="space-y-4">
                <input type="password" placeholder="Current password" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
                <input type="password" placeholder="New password" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
                <input type="password" placeholder="Confirm new password" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
              </div>
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">Update Password</button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Active Sessions</h2>
              <div className="flex items-center justify-between p-3 bg-[#0d0d1a] rounded-lg">
                <div><div className="text-sm text-white">Current Session</div><div className="text-xs text-gray-500">Windows 11 • Chrome</div></div>
                <span className="text-xs text-green-400">Active</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Appearance' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Theme</h2>
            <div className="flex items-center justify-between p-4 bg-[#0d0d1a] rounded-lg mb-4">
              <div><div className="text-sm text-white">Dark Mode</div><div className="text-xs text-gray-500">Use dark theme across the platform</div></div>
              <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition ${darkMode ? 'bg-[#00d4ff]' : 'bg-white/10'}`}><div className={`w-5 h-5 bg-white rounded-full transition ${darkMode ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} /></button>
            </div>
            <div className="p-4 bg-[#0d0d1a] rounded-lg">
              <div className="text-sm text-white mb-3">Editor Theme</div>
              <div className="grid grid-cols-3 gap-3">
                {['Dracula', 'Monokai', 'GitHub'].map((theme) => <button key={theme} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/20 transition">{theme}</button>)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0d0d1a] rounded-lg">
                <div><div className="text-sm text-white">Email Notifications</div><div className="text-xs text-gray-500">Receive emails about your activity</div></div>
                <button onClick={() => setEmailNotifs(!emailNotifs)} className={`w-12 h-6 rounded-full transition ${emailNotifs ? 'bg-[#00d4ff]' : 'bg-white/10'}`}><div className={`w-5 h-5 bg-white rounded-full transition ${emailNotifs ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} /></button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0d0d1a] rounded-lg">
                <div><div className="text-sm text-white">Community Notifications</div><div className="text-xs text-gray-500">Get notified about replies and mentions</div></div>
                <button onClick={() => setCommunityNotifs(!communityNotifs)} className={`w-12 h-6 rounded-full transition ${communityNotifs ? 'bg-[#00d4ff]' : 'bg-white/10'}`}><div className={`w-5 h-5 bg-white rounded-full transition ${communityNotifs ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} /></button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
              <div className="flex items-center justify-between p-4 bg-[#0d0d1a] rounded-lg">
                <div><div className="text-sm text-white">Public Profile</div><div className="text-xs text-gray-500">Allow others to view your profile</div></div>
                <button onClick={() => setPublicProfile(!publicProfile)} className={`w-12 h-6 rounded-full transition ${publicProfile ? 'bg-[#00d4ff]' : 'bg-white/10'}`}><div className={`w-5 h-5 bg-white rounded-full transition ${publicProfile ? 'translate-x-6' : 'translate-x-1'} mt-0.5`} /></button>
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h2>
              <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
              <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition">Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}