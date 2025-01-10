import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../graphql/queries';

export interface Profile {
  avatar?: string;
  fullName: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const generateAvatarUrl = (name: string) => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=40&bold=true&format=png`;
};

export const ProfileAvatar: React.FC = () => {
  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE);
  const profile = data?.profile;
  const [avatarError, setAvatarError] = useState(false);

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-loader-4-line animate-spin text-2xl" />
        </div>
      </div>
    );
  }

  if (!profile?.fullName) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-user-line text-2xl" />
        </div>
      </div>
    );
  }

  // Si hay un error con el avatar o no hay avatar, usar UI Avatars
  if (avatarError || !profile.avatar) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
        <img
          src={generateAvatarUrl(profile.fullName)}
          alt={profile.fullName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Intentar usar el avatar de la API primero
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
      <img
        src={profile.avatar}
        alt={profile.fullName}
        className="w-full h-full object-cover"
        onError={() => setAvatarError(true)}
      />
    </div>
  );
};

export default ProfileAvatar;