import Conversations from './Conversations.tsx';
import LogoutButton from './LogoutButton.tsx';
import SearchInput from './SearchInput.tsx';

function SideBar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3" />
        <Conversations />
        
        <LogoutButton />
    </div>
  )
}

export default SideBar;