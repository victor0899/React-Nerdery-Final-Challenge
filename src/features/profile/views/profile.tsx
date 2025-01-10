import { ProfileCard } from '../components/profileCard';
import { useProfile } from '../hooks/useProfile';

const Profile = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="p-8">
      <ProfileCard profile={profile} />
    </div>
  );
};

export default Profile;