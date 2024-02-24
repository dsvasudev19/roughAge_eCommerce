import {useEffect, useMemo, useState} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {usersColumns} from './columns/_columns'
import {User} from '../core/_models'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {KTCardBody} from '../../../../../../_metronic/helpers'

const UsersTable = () => {
  const [userData,setUserData] = useState([]);
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  const fetchUserData = async () => {
    try {
      // Replace the following line with your actual fetch request
      const response = await fetch("http://localhost:3000/v1/users");
      const newData = await response.json();
      setUserData(newData.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    console.log(userData);
    console.log(rows)
  } , [userData]);
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              }
              )
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {/* <tbody className='text-gray-600 fw-bold'>
            
              {
                userData.map((user: any, i: any) => {
                  return (
                    <tr>
                    <td key={`row-${i}-${user.id}`}>{i}</td>
                    <td key={`row-${i}-${user.id}`}>{user.first_name}</td>
                    <td key={`row-${i}-${user.id}`}>{user.last_name}</td>
                    <td key={`row-${i}-${user.id}`}>{user.email}</td>
                    <td key={`row-${i}-${user.id}`}>{user.phone}</td>
                    <td key={`row-${i}-${user.id}`}>
                      <select>
                        <option value="1">Edit</option>
                        <option value="2">Delete</option>
                      </select>
                      </td>
                    </tr>
                  )
                }
                  )
              }
            
          </tbody> */}
        </table>
      </div>
      <UsersListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  )
}

export {UsersTable}
