import {Router} from 'express';
import authRoutes from './authRoutes';
// import userRoutes from './userRoutes';
// import gymInfoRoutes from './gymInfoRoutes';
// import memberSubscriptionRoutes from './memberSubscriptionRoutes';
// import attendanceRoutes from './attendanceRoutes';
// import notificationRoutes from './notificationRoutes';
// import paymentRoutes from './paymentRoutes';

const router = Router();

router.use('/auth',authRoutes);
// router.use('/user',userRoutes);
// router.use('/gymInfo',gymInfoRoutes);
// router.use('/memberSubscription',memberSubscriptionRoutes);
// router.use('/attendance',attendanceRoutes);
// router.use('/notification',notificationRoutes);
// router.use('/payment',paymentRoutes);

export default router;

