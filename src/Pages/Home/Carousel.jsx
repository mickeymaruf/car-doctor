import carouselImg1 from '../../assets/images/banner/1.jpg'
import carouselImg2 from '../../assets/images/banner/2.jpg'
import carouselImg3 from '../../assets/images/banner/3.jpg'
import carouselImg4 from '../../assets/images/banner/4.jpg'

const carouselData = [
    {
        _id: 1,
        image: carouselImg1,
        prev: 4,
        next: 2
    },
    {
        _id: 2,
        image: carouselImg2,
        prev: 1,
        next: 3
    },
    {
        _id: 3,
        image: carouselImg3,
        prev: 2,
        next: 4
    },
    {
        _id: 4,
        image: carouselImg4,
        prev: 3,
        next: 1
    },
]

const Carousel = () => {
    return (
        <div className='relative mb-20'>
            <div className="carousel w-full max-h-[600px]">
                {
                    carouselData.map(carousel => <CarouselItem
                        key={carousel._id}
                        carousel={carousel}
                    />)
                }
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-24 text-white w-4/12">
                <h1 className='text-6xl font-bold mb-5 leading-[1.2]'>Affordable Price For Car Servicing</h1>
                <p className='font-thin text-xl mb-5'>There are many variations of passages of available, but the majority have suffered alteration</p>
                <a href="#slide3" className="btn btn-theme rounded-md mr-3">Discover More</a>
                <a href="#slide1" className="btn bg-transparent border-base-100 text-white hover:bg-base-100 hover:border-base-100 hover:text-black rounded-md">Latest Project</a>
            </div>
        </div>
    );
};

const CarouselItem = ({ carousel }) => {
    const { _id, image, prev, next } = carousel;
    return (
        <div id={`slide${_id}`} className="carousel-item w-full relative carousel-image">
            <img src={image} className="w-full object-cover object-top rounded-lg" alt="" />
            <div className="absolute flex gap-5 justify-between transform -translate-y-1/2 right-16 bottom-5 z-10">
                <a href={`#slide${prev}`} className="btn btn-circle bg-theme border-theme text-white hover:text-theme hover:bg-base-100 hover:border-theme">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle bg-theme border-theme text-white hover:text-theme hover:bg-base-100 hover:border-theme">❯</a>
            </div>
        </div>
    );
}

export default Carousel;