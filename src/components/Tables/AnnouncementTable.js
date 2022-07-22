import MaterialTable from '@material-table/core'
import { forwardRef, useEffect, useState } from 'react'

import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import axiosInstance from '../../helpers/axios'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const AnnouncementTable = () => {
  const [data, setData] = useState([])
  const [changeTrigger, setChangeTrigger] = useState(false)

  useEffect(() => {
    const getNews = async () => {
      const res = await axiosInstance.get('/api/announcement/get')
      setData(res?.data)
    }
    getNews()
  }, [changeTrigger])
  return (
    <MaterialTable
      title="Announcement Table"
      icons={tableIcons}
      columns={[
        { title: 'Subject', field: 'subject' },
        {
          title: 'Description',
          field: 'description',
          render: (item) => (
            <div onClick={() => alert(item.description)}>
              {item.description}
            </div>
          ),
        },
        {
          title: 'Image URL',
          field: 'image_url',
          render: (item) => (
            <div>
              <a href={item.image_url} target="_blank" rel="noreferrer">
                <img src={item.image_url} alt="imagex" height="50" width="50" />
              </a>
            </div>
          ),
        },
      ]}
      data={data}
      options={{
        actionsColumnIndex: -1,
        draggable: false,
        sorting: false,
        search: true,
        headerStyle: {
          backgroundColor: '#8aaae6',
          borderRight: '1px solid #d7d7d7',
          fontSize: '15px',
          textAlign: 'center',
          fontWeight: 'bold',
        },
        maxBodyHeight: '500px',
        cellStyle: {
          fontFamily: 'Tahoma, sans-serif',
          fontSize: '12px',
          textAlign: 'left',
          borderRight: '1px solid #817d7d',
          maxWidth: '10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = data
              const index = oldData.tableData.id
              dataUpdate[index] = newData
              axiosInstance
                .put('/api/announcement/update', {
                  id: index,
                  subject: dataUpdate[index].subject,
                  description: dataUpdate[index].description,
                })
                .then((response) => {
                  if (response.data.error) {
                    reject()
                  } else {
                    setData([...dataUpdate])
                    setChangeTrigger(!changeTrigger)
                    resolve()
                  }
                })
            }, 1000)
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data]
              const index = oldData.tableData.id
              dataDelete.splice(index, 1)
              axiosInstance
                .post('/api/announcement/delete', {
                  id: index,
                })
                .then((response) => {
                  if (response.data.error) {
                    //response modal
                    reject()
                  } else {
                    setData([...dataDelete])
                    setChangeTrigger(!changeTrigger)
                    resolve()
                  }
                })
            }, 1000)
          }),
      }}
    />
  )
}

export default AnnouncementTable
