import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as rentalActions from "../../store/rental";
import * as roomActions from "../../store/room";

function Reservations() {
  const sessionUser = useSelector((state) => state.session.user);
  const roomList = useSelector((state) => state.room.roomsList);
  const ownerRentals = useSelector(
    (state) => state.rental.myRentals.ownerRentals,
  );
  const renterRentals = useSelector(
    (state) => state.rental.myRentals.renterRentals,
  );
  const [loaded, setLoaded] = useState(false);
  const [roomsList, setRoomsList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(rentalActions.readMyRentals(sessionUser.id));
    dispatch(roomActions.readRooms()).then(() => setLoaded(true));
  }, [dispatch, sessionUser.id, setLoaded, loaded]);

  useEffect(() => {
    (async () => {
      const tempRooms = [...roomList];
      for (let i = 0; i < tempRooms.length; i++) {
        const room = tempRooms[i];
        room.RoomImages = room.RoomImages.reverse();
        // const signedUrl = await generatePresignedUrl(room.imageUrl);
        // room.imageUrl = signedUrl;

      }
      setRoomsList(tempRooms);
    })();
  }, [roomList]);

  const cancelReservation = async (rentalId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );
    if (confirm) {
      await dispatch(rentalActions.deleteRental(rentalId, sessionUser.id)).then(
        () => setLoaded(!loaded),
      );
    }
  };

  return (
    /*loaded ?*/
    <div>
      <h2>Your Reservations!</h2>
      <div className="owner-rentals">
        <table>
          <h2>Rooms You Own!</h2>
          <thead>
            <tr>
              <th></th>
              <th align="right">Location</th>
              <th align="right">Check-in Date</th>
              <th align="right">Check-out Date</th>
              <th></th>
            </tr>
          </thead>
          {ownerRentals?.length === 0 ? <h2>No Reservations yet!</h2> : null}
          {ownerRentals?.map((rental) => {
            return (
              <tbody>
                <tr>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                  >
                    <img
                      alt={
                        roomList?.find((room) => room.id === rental.roomId)
                          ?.title
                      }
                      src={
                        roomsList.find((room) => room.id === rental.roomId)
                          ?.RoomImages[0].imageUrl
                      }
                    ></img>
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {roomList?.find((room) => room.id === rental.roomId)?.title}
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {`${new Date(rental.checkIn).toLocaleString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {`${new Date(rental.checkOut).toLocaleString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </td>
                  <td align="right">
                    <button onClick={() => cancelReservation(rental.id)}>
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="renter-rentals">
        <table>
          <h2>Places You're Staying!</h2>
          <thead>
            <tr>
              <th></th>
              <th align="right">Location</th>
              <th align="right">Check-in Date</th>
              <th align="right">Check-out Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renterRentals?.map((rental) => {
              return (
                <tr>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                  >
                    <img
                      alt={
                        roomList?.find((room) => room.id === rental.roomId)
                          ?.title
                      }
                      src={
                        roomsList.find((room) => room.id === rental.roomId)
                          ?.RoomImages[0].imageUrl
                      }
                    ></img>
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {roomList?.find((room) => room.id === rental.roomId)?.title}
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {`${new Date(rental.checkIn).toLocaleString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </td>
                  <td
                    onClick={() =>
                      history.push(
                        `/rooms/${
                          roomList?.find((room) => room.id === rental.roomId)
                            ?.id
                        }`,
                      )
                    }
                    align="right"
                  >
                    {`${new Date(rental.checkOut).toLocaleString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}`}
                  </td>
                  <td align="right">
                    <button onClick={() => cancelReservation(rental.id)}>
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div> /*: null*/
  );
}

export default Reservations;
