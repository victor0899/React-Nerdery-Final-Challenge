import { useState, useEffect } from 'react';
import { API_CONFIG, getAuthHeaders } from '../../config/api';

const AppHeader = () => {
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_CONFIG.API_URL, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            query: `
              query {
                profile {
                  avatar
                }
              }
            `
          })
        });

        const data = await response.json();
        if (data.data?.profile?.avatar) {
          setProfileImage(data.data.profile.avatar);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="relative w-full">
      <header className="w-full py-8">
        <div className="flex items-center justify-between w-full h-16 px-6 py-3 bg-neutral-4 rounded-2xl shadow-sm">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 mr-6">
              <i className="ri-search-line text-neutral-2 text-2xl"></i>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border-none outline-none text-neutral-2 placeholder-neutral-2 leading-6"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-6 h-6">
              <i className="ri-notification-3-line text-neutral-2 text-2xl"></i>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-2">
              {isLoading ? (
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
          </div>
        </div>
      </header>

      <button 
        className="absolute w-10 h-10 p-2 rounded-lg bg-primary-4 flex items-center justify-center"
        style={{
          top: '132px',
          right: '40px',
          zIndex: 10
        }}
      >
        <i className="ri-add-line text-white text-2xl"></i>
      </button>
    </div>
  );
};

export default AppHeader;