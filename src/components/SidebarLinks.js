import { FiEdit} from 'react-icons/fi';
//import { BsKanban} from 'react-icons/bs';
import { Dashboard, Group, ManageAccounts, Notifications, Payment, SubscriptionsOutlined, SupervisedUserCircle } from '@mui/icons-material';

export const links = [
    {
      links: [
        {
          name: 'dashboard',
          icon: <Dashboard/>
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'users',
          icon: <Group/>
        },
        {
          name: 'roles',
          icon: <SupervisedUserCircle/>
        },
        {
          name: 'subscriptions',
          icon: <SubscriptionsOutlined/>

        },
        {
          name: 'Billing',
          icon: <Payment/>
        },
        
      ],
    },
  
    {
      title: 'Apps',
      links: [
        /*{
          name: 'kanban',
          icon: <BsKanban />,
        },*/
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'notifications',
          icon: <Notifications size='small'/>
        },
      ],
    },

    {
     links :[
      {
        name: 'profile',
        icon: <ManageAccounts/>
      },
     ]
    }
   
  ];
  