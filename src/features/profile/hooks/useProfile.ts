import { useQuery } from '@apollo/client';
import { GET_PROFILE } from '../../tasks/graphql/queries';
import { ProfileData } from '../types/profile.types';

export const useProfile = () => {
  const { data, loading, error } = useQuery<ProfileData>(GET_PROFILE);

  return {
    profile: data?.profile,
    isLoading: loading,
    error
  };
};