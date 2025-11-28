import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Description,
  TrendingUp,
  Inventory,
  AccountBalance,
  Add,
  Assessment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface QuickStat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const quickStats: QuickStat[] = [
    {
      title: 'Dokumenti ovog meseca',
      value: 145,
      icon: <Description />,
      color: '#2196f3',
    },
    {
      title: 'Vrednost prometa',
      value: '2.450.000 RSD',
      icon: <TrendingUp />,
      color: '#4caf50',
    },
    {
      title: 'Stavki na lageru',
      value: 1247,
      icon: <Inventory />,
      color: '#ff9800',
    },
    {
      title: 'Dugovanja',
      value: '850.000 RSD',
      icon: <AccountBalance />,
      color: '#f44336',
    },
  ];

  const recentDocuments = [
    { id: 1, number: 'UR-2025-001', type: 'Ulazna Kalkulacija', date: '28.11.2025', amount: 125000 },
    { id: 2, number: 'RO-2025-042', type: 'Račun Otpremnica', date: '27.11.2025', amount: 85000 },
    { id: 3, number: 'UR-2025-002', type: 'Ulazna Kalkulacija', date: '26.11.2025', amount: 210000 },
  ];

  const quickActions = [
    {
      label: 'Nova Ulazna Kalkulacija',
      icon: <Add />,
      onClick: () => navigate('/documents/vp/ur'),
      color: 'primary',
    },
    {
      label: 'Novi Račun Otpremnica',
      icon: <Add />,
      onClick: () => navigate('/documents/vp/ro'),
      color: 'secondary',
    },
    {
      label: 'Pregled Dokumenata',
      icon: <Description />,
      onClick: () => navigate('/documents'),
      color: 'info',
    },
    {
      label: 'Izveštaji',
      icon: <Assessment />,
      onClick: () => navigate('/reports'),
      color: 'success',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pregled ključnih metrika i brzi pristup funkcijama
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                borderLeft: 4,
                borderColor: stat.color,
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: 2,
                      p: 1.5,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Brze Akcije
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    variant="outlined"
                    color={action.color as any}
                    fullWidth
                    startIcon={action.icon}
                    onClick={action.onClick}
                    sx={{ py: 1.5, justifyContent: 'flex-start' }}
                  >
                    {action.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Documents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Nedavni Dokumenti
            </Typography>
            <List>
              {recentDocuments.map((doc, index) => (
                <React.Fragment key={doc.id}>
                  <ListItem
                    button
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    sx={{ px: 0 }}
                  >
                    <ListItemIcon>
                      <Description color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${doc.number} - ${doc.type}`}
                      secondary={`${doc.date} • ${doc.amount.toLocaleString('sr-RS')} RSD`}
                    />
                  </ListItem>
                  {index < recentDocuments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button fullWidth variant="text" sx={{ mt: 2 }} onClick={() => navigate('/documents')}>
              Vidi sve dokumente
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
