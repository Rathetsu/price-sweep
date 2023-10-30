# Price Sweep

Price Sweep is a web application designed to help you find the best deals and stay updated on price changes for products you're interested in. By simply pasting links from Amazon and Noon, Price Sweep will compare the prices, track them, and notify you about price changes through email notifications.

![Price Sweep Interface](https://i.imgur.com/mDZtoz4.png)

## Features

- **Price Tracking**: Paste the link of the product you want to track, and Price Sweep will keep an eye on its price for you.
- **Price Comparison**: Compare prices of the same product across Amazon and Noon to ensure you're getting the best deal.
- **Email Notifications**: Receive email notifications whenever the price of a tracked product changes.
- **Simple User Interface**: An easy-to-use interface designed to provide the best user experience.

## Technologies Used

- **[Next.js](https://nextjs.org/)**
- **[React.js](https://reactjs.org/)**
- **[MongoDB](https://www.mongodb.com/)**
- **[Bright Data's API](https://brightdata.com/)**
## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/price-sweep.git
   cd price-sweep
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Create a `.env` file in the root directory and add the following:

   ```
	BRIGHT_DATA_USERNAME=your bright data username
	BRIGHT_DATA_PASSWORD=your bright data password

	MONGODB_URI=your mongodb uri
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` in your browser and enjoy the application.

## Future Features

- **Price History Visualization**: Allow users to view the historical price changes of a product in graphical form.
- **Support for More E-commerce Platforms**: Expand our supported platforms beyond just Amazon and Noon.
- **User Profiles**: Let users have their own profiles, save multiple products, and customize their notification preferences.

## Feedback

If you find any bugs or have suggestions for improvement, please open an issue in this repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.