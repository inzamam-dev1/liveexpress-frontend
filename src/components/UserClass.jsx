
import React from "react";


class UserClass extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
            }
        }


    }


    async componentDidMount() {

        // fetch the api       
        const res = await fetch("https://api.github.com/users/mojombo");
        const data = await res.json();

        this.setState({
            userInfo: data,
        });
    }

    render() {

        const { name, location, avatar_url } = this.state.userInfo;

        return (

            <>
                <img src={avatar_url} alt="" width="200px" />
                <h1>Name:{name}</h1>
                <h3>Position:Lead Software Engineer</h3>
                <h3>Location{location}</h3>


            </>
        )
    }



}
export default UserClass;
