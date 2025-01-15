import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../features/tasks/graphql/queries';
import type { ProfileData } from './types';

const Profile = () => {
  const { data, loading, error } = useQuery<ProfileData>(GET_PROFILE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const profile = data?.profile;

  return (
    <div className="bg-neutral-4 rounded-lg shadow w-full mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Left Section - 40% */}
        <div className="w-full md:w-2/5 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-neutral-300">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-20 h-20 rounded-full mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neutral-300 flex items-center justify-center mb-4">
              <i className="ri-user-line text-4xl text-neutral-100"></i>
            </div>
          )}
          
          <a 
            href="https://github.com/victor0899" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-2xl font-bold text-neutral-100 text-center mb-2 hover:text-neutral-200 transition-colors"
          >
            {profile?.fullName}
          </a>
          <a 
            href={`mailto:${profile?.email}`}
            className="text-neutral-100 text-center hover:text-neutral-200 transition-colors"
          >
            {profile?.email}
          </a>
        </div>

        {/* Right Section - 60% */}
        <div className="w-full md:w-3/5 p-6 space-y-6">
          <div>
            <p className="text-neutral-100 opacity-80 mb-1">User Type</p>
            <p className="text-neutral-100 font-medium">
              {profile?.type}
            </p>
          </div>
          
          <div>
            <p className="text-neutral-100 opacity-80 mb-1">Member Since</p>
            <p className="text-neutral-100 font-medium">
              {profile?.createdAt && new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-neutral-100 opacity-80 mb-1">Last Update</p>
            <p className="text-neutral-100 font-medium">
              {profile?.updatedAt && new Date(profile.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;