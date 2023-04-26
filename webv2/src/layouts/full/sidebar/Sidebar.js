import { Box, Typography, List, Button, Drawer } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/rocket.png';
import logo from 'src/assets/images/logos/vitality_logo.png';
import { useLocation } from 'react-router';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import {IconAperture, IconDroplet, IconHeart, IconLayoutDashboard, IconOctagon, IconSettings, IconThermometer, IconUser} from '@tabler/icons';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/user/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Temperature',
    icon: IconThermometer,
    href: '/user/temperature',
  },
  {
    id: uniqueId(),
    title: 'Pulse',
    icon: IconHeart,
    href: '/user/pulse',
  },
  {
    id: uniqueId(),
    title: 'SpO2',
    icon: IconDroplet,
    href: '/user/spo2',
  },
  {
    navlabel: true,
    subheader: 'INFO',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: IconUser,
    href: '/user/profile',
  },
];

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '220px',
  overflow: 'hidden',
  display: 'block',
}));

const Sidebar = (props) => {

  const { pathname } = useLocation();
  const pathDirect = pathname;
  const sidebarWidth = '270px';

    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={3} ml={4}>
              <LinkStyled to="/user">
                <img src={logo} height={90} />
              </LinkStyled>
            </Box>
            <Box>
              <Box sx={{ px: 3 }}>
                <List sx={{ pt: 0 }} className="sidebarNav">
                  {Menuitems.map((item) => {
                    if (item.subheader) {
                      return <NavGroup item={item} key={item.subheader} />;
                      
                    } else {
                      return (
                        <NavItem item={item} key={item.id} pathDirect={pathDirect} />
                        );
                      }
                    })}
                </List>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
};

export default Sidebar;
