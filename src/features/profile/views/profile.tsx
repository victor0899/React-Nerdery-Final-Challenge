import { ProfileCard } from '../components/profileCard';
import { useProfile } from '../hooks/useProfile';
import { ContentLayout } from '../../../layout/contentLayout';
import SpinnerContainer from '../../../shared/components/spinner/spinnerContainer';

const Profile = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <SpinnerContainer />;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <ContentLayout>
      <div className="p-8">
        <ProfileCard profile={profile} />
      </div>
    </ContentLayout>
  );
};

export default Profile;