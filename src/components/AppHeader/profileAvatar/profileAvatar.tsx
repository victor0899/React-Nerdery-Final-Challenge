import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../graphql/queries';
import { Profile } from '../types';

export const ProfileAvatar: React.FC = () => {
  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE);
  const profileImage = data?.profile?.avatar;

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-loader-4-line animate-spin text-2xl" />
        </div>
      </div>
    );
  }

  if (!profileImage) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-user-line text-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  );
};