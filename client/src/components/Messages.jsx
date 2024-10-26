import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='flex flex-col flex-1 p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto'>
            <div className='flex justify-center mb-6'>
                <div className='flex flex-col items-center text-center'>
                    <Avatar className="h-24 w-24 mb-2 shadow-md">
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-lg font-semibold text-gray-700'>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="mt-3 h-9 px-4 bg-blue-500 text-white hover:bg-blue-600" variant="secondary">
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>
            
            <div className='flex flex-col gap-4'>
                {messages && messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`p-3 rounded-lg max-w-xs break-words shadow ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.message}
                        </div>
                    </div>
                ))}
                {messages?.length === 0 && (
                    <p className="text-center text-gray-500">No messages yet.</p>
                )}
            </div>
        </div>
    );
}

export default Messages;
