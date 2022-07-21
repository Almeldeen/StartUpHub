/* eslint-disable */
import { ROLES } from 'app/app-constants';
import { FuseNavigationItem } from 'theme/components/navigation';




export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'Home',
        title   : 'Home',
        type    : 'basic',
        link: '/timeline',
        icon    : 'heroicons_outline:home',
    },
    // Intern routes
    {
        id      : 'Internships',
        title   : 'Internships',
        roles: [ROLES.INTERN],
        type    : 'basic',
        link: '/search-jobs',
        icon    : 'heroicons_outline:briefcase',
    },
    {
        id      : 'Requested-internships',
        title   : 'Requested internships',
        type    : 'basic',
        roles: [ROLES.INTERN],
        link: '/intern/requested-internships',
        icon    : 'feather:coffee',
    },


    // startup routes
    {
        id      : 'Internships',
        title   : 'My internships',
        roles: [ROLES.COMPANY],
        type    : 'basic',
        link: '/company/my-jobs',
        icon    : 'heroicons_outline:briefcase',
    },
    {
        id      : 'add-new-job',
        title   : 'New internship',
        roles: [ROLES.COMPANY],
        type    : 'basic',
        link: '/company/add-job',
        icon    : 'feather:file-plus',
    },
    {
        id      : 'MSGS',
        title   : 'Messages',
        roles: [],
        type    : 'basic',
        link: '/chat',
        icon    : 'heroicons_outline:chat',
    },
];
