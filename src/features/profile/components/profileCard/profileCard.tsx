import { User } from '../../types/profile.types';

interface ProfileCardProps {
  profile: User;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="bg-neutral-4 rounded-lg shadow max-w-4xl mx-auto"> {/* Añadido max-w-4xl y mx-auto */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Avatar and Name */}
        <div className="w-full md:w-2/5 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-neutral-300"> {/* Cambiado p-6 a p-8 para coincidir */}
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

        {/* Right Section - Profile Info */}
        <div className="w-full md:w-3/5 p-8 space-y-6"> {/* Cambiado p-6 a p-8 para coincidir */}
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

export default ProfileCard;