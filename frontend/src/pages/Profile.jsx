import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CloudCog } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            // Check if token exists in localStorage
            const storedToken = localStorage.getItem('token');
            console.log(storedToken);
            console.log("this is token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            console.log("this is outside of the try block");
            try {
            console.log("this is inside of the try block");
                setLoading(true);
                console.log("this is above response");
                const response = await axios.get(`${backendUrl}/api/user/profile`, {
                    headers: { token: storedToken }
                });

                console.log("what is response", response);

                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    toast.error(response.data.message || 'Failed to fetch user data');
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [backendUrl]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-semibold mb-4">Login to shop</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold mb-6 text-center">Your Profile</h1>

            <div className="space-y-4">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-medium mb-2">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="border-b pb-4">
                    <h2 className="text-xl font-medium mb-2">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Account Created</p>
                            <p className="font-medium">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Last Updated</p>
                            <p className="font-medium">
                                {new Date(user.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div> */}

                <div className="pt-4">
                    <button
                        onClick={() => navigate('/orders')}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition w-full"
                    >
                        View Your Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;