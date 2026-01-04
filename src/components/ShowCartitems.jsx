
const ShowCartitem = ({cartItem}) => {

    console.log(cartItem.name)


    return (
        <div>
            {cartItem.map((item, index) => {
                <div key={index}>
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                </div>
            })}
        </div>
    )

}
export default ShowCartitem;