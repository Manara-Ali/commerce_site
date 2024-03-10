import {useSelector} from 'react-redux';

export const Greeting = () => {
    const {user} = useSelector((state) => {
        return state.usersCombinedReducer;
    });

  // GET THE DATE FROM JS OBJECT TO GREET USER
  const timeOfDay = new Date().getHours();

  const greeting = () => {
    if(timeOfDay >= 5 && timeOfDay < 12) {
        return user ? `Good Morning ${user?.name?.split(" ")[0]}!` : "Good Morning!";
    } else if (timeOfDay >= 12 && timeOfDay < 18) {
      return user ? `Good Afternoon ${user?.name?.split(" ")[0]}!` : "Good Afternoon!";
    } else {
      return user ? `Good Evening ${user?.name?.split(" ")[0]}!` : "Good Evening!";
    }
  };

  return (
    <div className="mt-3 ml-4">
        <h4>{greeting()}</h4>
    </div>
  )
};
