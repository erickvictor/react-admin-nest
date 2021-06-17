import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { Order } from "../../models/order";
import { OrderItem } from "../../models/order-item";

const hide = {
  maxHeight: 0,
  transition: '1000ms ease-in'
}

const show = {
  maxHeight: '150px',
  transition: '1000ms ease-out'
}

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`orders?page=${page}`);

      setOrders(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const select = (id: number) => {
    setSelected(selected !== id ? id : 0);
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Roles</h1>
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: Order) => {
              return (
                <>
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.email}</td>
                    <td>{o.total}</td>
                    <td>
                      <button onClick={() => select(o.id)} className="btn btn-sm btn-outline-secondary">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div className="overflow-hidden" style={ selected === o.id ? show : hide }>
                        <table className="table table-sm">
                          <thead>
                            <th>#</th>
                            <th>Product Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </thead>
                          <tbody>
                            {o.order_items.map((i: OrderItem) => {
                              return (
                                <tr key={i.id}>
                                  <td>{i.id}</td>
                                  <td>{i.product_title}</td>
                                  <td>{i.quantity}</td>
                                  <td>{i.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Orders;
