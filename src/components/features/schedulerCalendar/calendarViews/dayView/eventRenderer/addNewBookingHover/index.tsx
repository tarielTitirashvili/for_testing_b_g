
const AddNewBookingHover = () => {
  return (
    <div
      className="
        absolute inset-1
        bg-[linear-gradient(90deg,#FF30331A,#EF78001A)] 
        rounded-2xl 
        opacity-0 
        group-hover:opacity-100 
        flex items-center justify-center
        cursor-pointer
        transition-all
        duration-500
        linear
      "
    >
      {/* Plus icon */}
      <div
        className="
          opacity-0 
          group-hover:opacity-100 
          transition-opacity
          text-[#EF7800]
          z-10
        "
      >
        <img src='/assets/images/addBooking.svg' alt='add' />
      </div>
    </div>
  )
}

export default AddNewBookingHover
