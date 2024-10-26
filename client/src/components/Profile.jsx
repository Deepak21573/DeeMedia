// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import useGetUserProfile from '@/hooks/useGetUserProfile';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';

// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');

//   const { userProfile, user } = useSelector(store => store.auth);

//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   const isFollowing = false;

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   }

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className='flex max-w-5xl justify-center mx-auto pl-10'>
//       <div className='flex flex-col gap-20 p-8'>
//         <div className='grid grid-cols-2'>
//           <section className='flex items-center justify-center'>
//             <Avatar className='h-32 w-32'>
//               <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </section>
//           <section>
//             <div className='flex flex-col gap-5'>
//               <div className='flex items-center gap-2'>
//                 <span>{userProfile?.username}</span>
//                 {
//                   isLoggedInUserProfile ? (
//                     <>
//                       <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
//                     </>
//                   ) : (
//                     isFollowing ? (
//                       <>
//                         <Button variant='secondary' className='h-8'>Unfollow</Button>
//                         <Button variant='secondary' className='h-8'>Message</Button>
//                       </>
//                     ) : (
//                       <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
//                     )
//                   )
//                 }
//               </div>
//               <div className='flex items-center gap-4'>
//                 <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
//                 <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
//                 <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
//               </div>
//               <div className='flex flex-col gap-1'>
//                 <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
//                 <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
//                 <span>🤯Coder</span>
//                 <span>🤯Cricket</span>
//                 <span>🤯DM for collaboration</span>
//               </div>
//             </div>
//           </section>
//         </div>
//         <div className='border-t border-t-gray-200'>
//           <div className='flex items-center justify-center gap-10 text-sm'>
//             <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
//               POSTS
//             </span>
//             <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
//               SAVED
//             </span>
//             <span className='py-3 cursor-pointer'>SHORTS</span>
//             <span className='py-3 cursor-pointer'>TAGS</span>
//           </div>
//           <div className='grid grid-cols-3 gap-1'>
//             {
//               displayedPost?.map((post) => {
//                 return (
//                   <div key={post?._id} className='relative group cursor-pointer'>
//                     <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
//                     <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                       <div className='flex items-center text-white space-x-4'>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <Heart />
//                           <span>{post?.likes.length}</span>
//                         </button>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <MessageCircle />
//                           <span>{post?.comments.length}</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState('posts');
  const { userProfile, user } = useSelector(store => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const displayedPosts = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex max-w-5xl justify-center mx-auto bg-gradient-to-r from-blue-50 to-purple-100 text-gray-800 font-sans p-10 rounded-lg shadow-lg'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32 border-2 border-purple-300 shadow-md'>
              <AvatarImage src={userProfile?.profilePicture} alt="Profile Photo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span className='font-bold text-2xl text-gray-800'>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant='secondary' className='hover:bg-purple-200 text-purple-800 h-8'>Edit Profile</Button>
                    </Link>
                    <Button variant='secondary' className='hover:bg-purple-200 text-purple-800 h-8'>View Archive</Button>
                    <Button variant='secondary' className='hover:bg-purple-200 text-purple-800 h-8'>Ad Tools</Button>
                  </>
                ) : (
                  <Button className='bg-purple-500 hover:bg-purple-600 text-white h-8'>Follow</Button>
                )}
              </div>
              <div className='flex items-center gap-4 text-gray-500'>
                <p><span className='font-semibold text-gray-800'>{userProfile?.posts.length}</span> posts</p>
                <p><span className='font-semibold text-gray-800'>{userProfile?.followers.length}</span> followers</p>
                <p><span className='font-semibold text-gray-800'>{userProfile?.following.length}</span> following</p>
              </div>
              <div className='flex flex-col gap-1 text-gray-600'>
                <span className='font-semibold'>{userProfile?.bio || 'Bio here...'}</span>
                <Badge className='w-fit bg-purple-200 text-purple-800 flex items-center gap-1 p-1 rounded'>
                  <AtSign /> <span>{userProfile?.username}</span>
                </Badge>
                <span>🤯 Coder</span>
                <span>🤯 Cricket</span>
                <span>🤯 DM for Collaboration</span>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-gray-300 mt-10'>
          <div className='flex items-center justify-center gap-10 text-sm text-gray-600'>
            <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold text-gray-800' : ''}`} onClick={() => handleTabChange('posts')}>POSTS</span>
            <span className={`py-3 cursor-pointer ${activeTab === 'bookmarks' ? 'font-bold text-gray-800' : ''}`} onClick={() => handleTabChange('bookmarks')}>SAVED</span>
            <span className='py-3 cursor-pointer'>SHORTS</span>
            <span className='py-3 cursor-pointer'>REELS</span>
          </div>
          <div className='grid grid-cols-3 gap-5 mt-8'>
            {displayedPosts?.map(post => (
              <div key={post._id} className='border border-gray-300 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg'>
                <img src={post?.image} alt={post?.title} className='w-full h-48 object-cover' />
                <div className='p-4 bg-white'>
                  <h3 className='font-semibold text-lg text-gray-800'>{post?.title}</h3>
                  <p className='text-sm text-gray-500'>{post?.description}</p>
                </div>
              </div>
            ))}
            {displayedPosts?.length === 0 && (
              <div className='col-span-3 text-center text-gray-500'>
                <p>No {activeTab === 'posts' ? 'posts' : 'bookmarks'} found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;






