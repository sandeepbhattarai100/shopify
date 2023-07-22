{orders.map((o, i) => (
  <>
      <table className='md:w-full w-[200px] '>

          <tr>
              <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>#</th>
              <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse '>status</th>
              <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>Product Id</th>
              <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse '>date</th>
              <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>payment</th>
              {/* <th className='p-3 font-mono text-left bg-orange-600 text-white capitalize text-[22px] border-collapse'>Quantity</th> */}


          </tr>

          <tbody>

              <tr>
                  <td className='p-3 border '>{i + 1}</td>
                  <td className='p-3 border '>{o?.status}</td>
                  <td className='p-3 border '>{o?.products[i]._id}</td>
                  <td className='p-3 border '>{moment(o?.createdAt).fromNow()}</td>
                  <td className='p-3 border '>{o?.payment?.success ? "success" : "Not Success"}</td>
                  {/* <td className='p-3 border '>{o?.products?.length}</td> */}



              </tr>
          </tbody>


      </table>

  </>
))}