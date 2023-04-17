import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { visuallyHidden } from '@mui/utils';
  import { useState } from 'react';
  import Iconify from '../../components/iconify/Iconify';
  import Label from '../../components/label/Label';
  import Scrollbar from '../../components/scrollbar/Scrollbar';
  import { UserListToolbar } from '../../sections/@dashboard/user';
 

  
  function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  
  const rows = [
    createData('study oversea',"20/3/2023", "20/3/2023", "Active"),
    createData('prj 1',"20/3/2023", "20/3/2023", "Active"),
    createData('prj 2',"20/3/2023", "20/3/2023", "Active"),
  ];
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'name',
      numeric: false,
  
      label: 'Project Name',
    },
    {
      id: 'start',
  
      label: 'Start Date',
    },
    {
      id: 'end',
  
      label: 'End Date',
    },

  
    {
      id: 'leader',
  
      label: 'Leader',
    },
    {
      id: 'partner',
  
      label: 'Partner',
    },
    {
      id: 'status',
  
      label: 'Status',
    },
    {
      label: 'Actions',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  function ListProjectTaskMember(props) {
    const navigate = useNavigate()
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [project, setProject] = useState([]);
  
    const [filterName, setFilterName] = useState('');
    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
    };
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setProject(data);
    };
  
    return (
      <>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Project Task
            </Typography>
      
          </Stack>
  
          <Card>
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
  
            <Scrollbar>
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover key={index}>
                          <TableCell component="th">{row.name}</TableCell>
                          <TableCell align="left">{row.calories}</TableCell>
                       
                          <TableCell align="left">{row.carbs}</TableCell>
                          <TableCell align="left">{row.calories}</TableCell>
                          <TableCell align="left">{row.fat}</TableCell>
                          
                          <TableCell align="left">
                            {' '}
                            <Label color="success">active</Label>
                          </TableCell>
                          <TableCell align="left">
                            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                              <Tooltip title="View Task List">
                                <IconButton onClick={() => navigate("/staff/list-task")} aria-label="delete">
                                  <RemoveRedEyeRoundedIcon />
                                </IconButton>
                              </Tooltip>
  
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
  
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={stableSort.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>

      </>
    );
  }
  
  export default ListProjectTaskMember;
  