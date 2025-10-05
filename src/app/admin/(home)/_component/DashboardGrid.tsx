import { ROLE_DASHBOARD } from '../_constants/text';

import { DashboardCard } from './DashboardCard';

export function DashboardGrid({ role }: { role: string }) {
  const roleData = ROLE_DASHBOARD[role];

  const cards = Object.entries(roleData).filter(([, value]) => {
    if (role === 'ROLE_ADMIN') {
      return value.title !== '공지사항 관리';
    }
    return true;
  });

  return (
    <Grid>
      {cards.map(([key, { route, title, subtitle }]) => (
        <DashboardCard
          key={key}
          title={title}
          subtitle={subtitle}
          route={route}
        />
      ))}
    </Grid>
  );
}

const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
      {children}
    </div>
  );
};
