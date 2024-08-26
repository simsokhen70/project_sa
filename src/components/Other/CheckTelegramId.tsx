"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { dontAskAgain, getUserByUsername } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import TelegramIcon from '@mui/icons-material/Telegram';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { showToast } from '@/services/commonfunction.service';

const CheckTelegramId = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (session?.user) {
            getUserByUsername(session?.user?.username).then((user) => {
                if (!user?.data?.payload?.telegramId && !user?.data?.payload?.checkBox) {
                    onOpen();
                }
            })
        }
    }, [session]);
    const botUsername = 'OrginalKhenBot';
    const messageText = `Here is your Gigi deployment platform username: sokhen\nPlease click send now to interactive with Our bot.`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Construct the Telegram link with the pre-defined message
        const telegramLink = `tg://msg_url?url=https://t.me/${botUsername}&text=${encodeURIComponent(messageText)}`;

        // Try to open the Telegram app
        window.location.href = telegramLink;

        // Fallback to web version if app doesn't open after a short delay
        setTimeout(() => {
            window.location.href = `https://t.me/${botUsername}?text=${encodeURIComponent(messageText)}`;
        }, 500);

        // Optionally, redirect back to the main page after a short delay
        setTimeout(() => {
            router.push('/');
        }, 2000);
    };


    const handleDontAsk = () => {
        try {
            dontAskAgain(session?.user.username).then((res) => {
                if (res.status !== 200) {
                    showToast("Something went wrong");
                }
            })
        } catch (err) {
            console.error("Error updating dontAskAgain", err);
        }
    }


    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{" "}</ModalHeader>
                            <ModalBody>
                                <div className="flex items-center justify-center h-fit bg-gray-100">
                                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                                        <CircleNotificationsIcon fontSize='large' />
                                        <h1 className="text-2xl font-bold mb-6">Telegram Notification Bot</h1>
                                        <p className="mb-6">Your Telegram ID is not set, please set it in your profile to get <strong>Information</strong> and <strong>Notification</strong>.</p>
                                        <p className="mb-6">Click the button below to open Telegram.</p>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} 
                    transition-colors`}
                                        >
                                         <TelegramIcon />    {isSubmitting ? 'Opening Telegram...' : 'Open Telegram'}
                                        </button>
                                        <div className='flex justify-center items-center gap-1 mt-1'>
                                            <input type="checkbox" onClick={()=>handleDontAsk()} />
                                            <span>Don{"'"}t ask again</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                    {" "}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CheckTelegramId