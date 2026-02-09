import "./styles.css";


function mapEventToView(event){
  if(!event.repo){
    console.warn("Missing repo", event);
  }

  let action;
  switch (event.activity?.type){
    case "REPO_STARTED":
      action = "started a repository";
      break;
    case "REPO_STARRED":
      action = "starred a repository";
      break;
    case "REPO_FORKED":
      action = "forked a repository";
      break;
    case "REPO_ARCHIVED":
      action = "archived a repository";
      break;
    default:
      action = "did something";
      break;
  }

  const userBadge = event.actor?.avatarUrl??"";
  const username = event.actor?.username??"unknown user";
  const repoOwner = event.repo?.owner??"unknown repo";
  const timeStamp = event.timestamp??"sometime ago";
  const lang = event.repo?.lang??"-";
  const description = event.repo?.description??"unknown";
  const repoName = event.repo?.name??"";

  return({
    
    username,
    timeStamp,
    repoOwner,
    lang,
    action,
    description,
    repoName,
    userBadge,
  })
}








function FeedBody({ vm }){
  return(
    <div className="feed-card__content">
      <div className="content__header">
        <img className="content__user-badge" src={vm.userBadge}></img>
        <div className="content__name">
          <strong>{vm.repoOwner}/{vm.repoName}</strong>
          </div>
      </div>
      <div className="content__body">{vm.description}</div>
      <div className="content__footer">
        <div>{vm.lang}</div>
        <div></div>
      </div>
    </div>
  );
}







function FeedHeader({ vm }){
  return(
    <div className="user-badge">


      
      <img className="user-badge__avatar" src={vm.userBadge}></img>
      


      <div className="user-badge__info">
        <div className="info__username">
          <strong>{vm.username}</strong>
          <p>{vm.action}</p>
        </div>
        <div className="timestamp">{vm.timeStamp}</div>
      </div>


      <div className="user-badge__options"></div>
      
    </div>
  )
}
  



function FeedCard({ event }){
  const vm = mapEventToView(event);
  return (
    <div className="feedcard">
      <FeedHeader vm = {vm} />
      <FeedBody vm = {vm} />
    </div>
  );
}



import { useEffect, useState } from "react";

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/feed/")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  if (events.length == 0){
    return(
      <p className="noactivity">No activity recently...</p>
    );
  }

  return (
    <div>
      {events.map((event) => (
        <FeedCard key={event.id} event={event} />
      ))}
    </div>
  );
}

