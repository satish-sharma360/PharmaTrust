import Driver from '../models/driver.model.js'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

const createDriver = async (req, res) => {
    try {
        const { driverId, driverName, driverLicense, vehicleModel, availabilty, contactNo, vehicleLicense, licenseValidity, password } = req.body;

        if (!driverName || !driverLicense || !contactNo || !password) {
            return res.status(500).json({ success: false, message: 'All field required' })
        }

        const newDriver = new Driver({
            driverId,
            driverName,
            driverLicense,
            vehicleModel,
            availabilty,
            contactNo,
            vehicleLicense,
            licenseValidity,
            password
        })

        await newDriver.save()

        res.status(200).json({ success: true, message: 'Driver added successfully!', newDriver })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const getDriver = async (req, res) => {
    try {
        const driver = await Driver.find();

        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' })
        }

        res.status(200).json({ success: true, driver })

    } catch (error) {
        next(error)
    }
}

const updateDriver = async (req, res) => {
    try {
        const driverId = req.params.id

        const updateDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true })

        if (!updateDriver) {
            return res.status(404).json({ success: false, message: 'Driver not found!' })
        }

        res.status(200).json({ success: true, message: 'Driver Updated Successfully!', updateDriver })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const deleteDriver = async (req, res) => {
    try {
        const driverId = req.params.id
        const deleteDriver = await Driver.findByIdAndDelete(driverId)

        if (!deleteDriver) {
            return res.status(404).json({ success: false, message: 'Driver not found!' })
        }
        res.status(200).json({ success: true, message: 'Driver Deleted Successfully!', deleteDriver })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getUpdateDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id)
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found!' })
        }
        res.status(200).json({ success: true, driver })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const checkDataExists = async (req, res) => {
    try {
        const { driverId, driverLicense, vehicleLicense, password } = req.query;

        let exists = false;

        if (driverId) {
            const existingDriverId = await Driver.findOne({ driverId });
            if (existingDriverId) {
                exists = true;
            }
        }
        if (driverLicense) {
            const existingDriverLicense = await Driver.findOne({ driverLicense });
            if (existingDriverLicense) {
                exists = true;
            }
        }
        if (vehicleLicense) {
            const existingVehicleLicense = await Driver.findOne({ vehicleLicense });
            if (existingVehicleLicense) {
                exists = true;
            }
        }
        if (password) {
            const existingPassword = await Driver.findOne({ password });
            if (existingPassword) {
                exists = true;
            }
        }

        res.json({ exists });
    } catch (error) {
        console.error('Error in checkDataExists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signIn = async (req, res, next) => {
    try {
        const { driverId, password } = req.body;

        const exist = await Driver.findOne({ driverId })

        if (!exist) {
            return next(errorHandler(404, 'Driver not found'))
        }

        if (exist.password !== password) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        const token = jwt.sign({ id: exist._id }, process.env.JWT_SECRET)

        const driverData = await Driver.findOne(exist._id)

        res.cookie('driver_access_token', token, { httpOnly: true }).status(200).json(driverData)
    } catch (error) {
        next(error)
    }
}

const updateDriverPro = async (req, res, next) => {
    if (req.driver.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = req.body.password;
        }

        const updatedDriver = await Driver.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    driverId: req.body.driverId,
                    driverName: req.body.driverName,
                    driverLicense: req.body.driverLicense,
                    vehicleModel: req.body.vehicleModel,
                    availabilty: req.body.availabilty,
                    contactNo: req.body.contactNo,
                    vehicleLicense: req.body.vehicleLicense,
                    password: req.body.password,
                },
            },
            { new: true }
        );

        updatedDriver.password = undefined;

        res.status(200).json(updateDriver);
    } catch (error) {
        next(error);
    }
};

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('driver_access_token');
        res.status(200).json('Driver has been logged out!');
    } catch (error) {
        next(error);
    }
};

export {createDriver ,getDriver, updateDriver , deleteDriver, getUpdateDriver,checkDataExists,signIn , updateDriverPro,signOut}