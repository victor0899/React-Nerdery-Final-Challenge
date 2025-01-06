import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../graphql/queries';
import { useState, useEffect } from 'react';

export const ProfileAvatar = () => {
  const [profileImage, setProfileImage] = useState('');
  const { data, loading } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (data?.profile?.avatar) {
      setProfileImage(data.profile.avatar);
    }
  }, [data]);

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-loader-4-line animate-spin text-2xl"></i>
        </div>
      ) : profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-4">
          <i className="ri-user-line text-2xl"></i>
        </div>
      )}
    </div>
  );
};
