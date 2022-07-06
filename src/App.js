import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar } from './components';
import {
  DashBoard,
  Kanban,
  Editor,
  Forms,
  ViewSubscription,
  ListSubscription,
  EditSubscription,
  NewSubscription,
  DeletedSubscriptions,
  ListUser,
  NewUser,
  ViewUser,
  EditUser,
  ListRoles,
  EditRoles,
  Profile,
} from './pages';

import './App.css';

import ListNotification from './pages/Notifications/ListNotification';
import ViewNotification from './pages/Notifications/ViewNotification';
import EditNotification from './pages/Notifications/EditNotification';

import AddRole from './pages/Roles/AddRole';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { currentMode, activeMenu, currentColor, setThemeSettings } =
    useStateContext();

  return (
    <div className={currentMode === 'Light' ? 'light' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<DashBoard />} />
                <Route path="/dashboard" element={<DashBoard />} />

                {/* pages  */}
                <Route path="/forms" element={<Forms />} />

                {/* users*/}
                <Route path="/users">
                  <Route index element={<ListUser />} />
                  <Route path="new" element={<NewUser />} />
                  <Route path=":userid" element={<ViewUser />} />
                  <Route path="edit/:userid" element={<EditUser />} />
                </Route>

                {/* roles*/}
                <Route path="/roles">
                  <Route index element={<ListRoles />} />
                  <Route path="edit/:idrole" element={<EditRoles />} />
                  <Route path="new" element={<AddRole />} />
                </Route>

                {/*subscriptions*/}
                <Route path="/subscriptions">
                  <Route index element={<ListSubscription />} />
                  <Route path="new" element={<NewSubscription />} />
                  <Route path=":subid" element={<ViewSubscription />} />
                  <Route path="edit/:subid" element={<EditSubscription />} />
                  <Route path="bin" element={<DeletedSubscriptions />} />
                </Route>

                {/* Notification */}
                <Route path="/notifications">
                  <Route index element={<ListNotification />} />
                  <Route
                    path="view/:idRequest"
                    element={<ViewNotification />}
                  />
                  <Route
                    path="edit/:idRequest"
                    element={<EditNotification />}
                  />
                </Route>

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
