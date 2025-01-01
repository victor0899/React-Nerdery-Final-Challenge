import { useState } from 'react';
import ravn from '../../assets/ravn.svg';

const Sidebar = () => {
    const [selected, setSelected] = useState('dashboard');

    const linkStyle = "flex items-center gap-2 text-body-m text-neutral-2 hover:text-neutral-1 uppercase relative pl-4 h-[56px]";
    const selectedStyle = "bg-gradient-to-r from-[rgba(186,37,37,0)] to-[rgba(210,77,77,0.1)] w-[232px] text-primary-4";
    const rectangleStyle = "absolute right-0 top-0 w-1 h-[56px] bg-primary-4";

    return (
        <>
            {/* Sidebar for larger screens */}
            <aside className="hidden md:block w-[232px] h-[836px] bg-neutral-4 rounded-3xl py-3 px-0 pb-[620px] relative">
                <img src={ravn} alt="Ravn Logo" className="absolute w-10 h-10 top-3 left-24" />
                <nav className="flex flex-col gap-4 pt-24">
                    <a
                        href="/dashboard"
                        className={`${linkStyle} ${selected === 'dashboard' ? selectedStyle : ''}`}
                        onClick={() => setSelected('dashboard')}
                    >
                        <i className="ri-function-line"></i>
                        DASHBOARD
                        {selected === 'dashboard' && <div className={rectangleStyle}></div>}
                    </a>
                    <a
                        href="/tasks"
                        className={`${linkStyle} ${selected === 'tasks' ? selectedStyle : ''}`}
                        onClick={() => setSelected('tasks')}
                    >
                        <i className="ri-menu-line"></i>
                        MY TASK
                        {selected === 'tasks' && <div className={rectangleStyle}></div>}
                    </a>
                </nav>
            </aside>

            {/* Bottom navigation for smaller screens */}
            <nav className="md:hidden fixed bottom-0 w-full bg-neutral-4 rounded-t-3xl py-3 px-0 flex justify-around">
                <button
                    className={`flex flex-col items-center ${selected === 'dashboard' ? 'text-primary-4' : 'text-neutral-2'}`}
                    onClick={() => setSelected('dashboard')}
                >
                    <i className="ri-function-line text-2xl"></i>
                    <span className="text-xs uppercase">Dashboard</span>
                </button>
                <button
                    className={`flex flex-col items-center ${selected === 'tasks' ? 'text-primary-4' : 'text-neutral-2'}`}
                    onClick={() => setSelected('tasks')}
                >
                    <i className="ri-menu-line text-2xl"></i>
                    <span className="text-xs uppercase">My Task</span>
                </button>
            </nav>
        </>
    );
}

export default Sidebar;
