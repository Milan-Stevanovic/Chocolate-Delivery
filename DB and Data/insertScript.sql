USE [DeliveryDatabase]
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Id], [CustomerId], [DelivererId], [OrderState], [Address], [Comment], [Price], [DeliveryTime]) VALUES (1, 3, 4, N'DELIVERED', N'Customerova 25', N'', 1275, CAST(N'2022-07-11T23:15:52.4534111' AS DateTime2))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DelivererId], [OrderState], [Address], [Comment], [Price], [DeliveryTime]) VALUES (2, 5, -1, N'PENDING', N'Petroviceva 30', N'', 775, CAST(N'9999-12-31T23:59:59.9999999' AS DateTime2))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DelivererId], [OrderState], [Address], [Comment], [Price], [DeliveryTime]) VALUES (3, 6, -1, N'PENDING', N'Markoviceva 35', N'', 1350, CAST(N'9999-12-31T23:59:59.9999999' AS DateTime2))
INSERT [dbo].[Orders] ([Id], [CustomerId], [DelivererId], [OrderState], [Address], [Comment], [Price], [DeliveryTime]) VALUES (4, 7, 4, N'DELIVERED', N'Nikoliceva 40', N'', 1350, CAST(N'2022-07-11T23:19:14.4684946' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (1, N'Berries Cheesecake', 50, N'Raspberry, Strawberry, Dark Chocolate, Vanilla', N'Resources\Images\berries_cheesecake.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (2, N'Classic Truffle', 35, N'Dark Chocolate Ganache, Cocoa Powder', N'Resources\Images\classic_truffle.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (3, N'Coconut Honey', 45, N'Coconut Cream, Honey, Dark Chocolate', N'Resources\Images\coconut_honey.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (4, N'Hazelnut Espresso', 40, N'Hazelnut, Espresso Chocolate, Cocoa Powder', N'Resources\Images\hazelnut_espresso.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (5, N'Pepermint Cream', 45, N'Pepermint Cream, Dark Chocolate', N'Resources\Images\pepermint_cream.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (6, N'Strawberry Orange', 55, N'Strawberry Jam, Orange Peel, Dark Chocolate', N'Resources\Images\strawberry_orange.png')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Ingredients], [Picture]) VALUES (7, N'Yellow Raspberry', 60, N'Yellow Raspberry Jam, Frozen Raspberry, Dark Chocolate', N'Resources\Images\yellow_raspberry.png')
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (1, 1, 5)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (1, 5, 5)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (1, 6, 10)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 1, 1)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 2, 1)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 3, 1)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 4, 1)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 6, 1)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (2, 7, 5)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (3, 6, 20)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (4, 1, 10)
INSERT [dbo].[OrderProducts] ([OrderId], [ProductId], [Quantity]) VALUES (4, 7, 10)
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220711193253_DeliveryMigration', N'5.0.17')
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (1, N'admin', N'admin@admin', N'$2a$11$c/BF31MGJyW.F3ultCVYx.Lg/ONm5Y4g2VGvZyBx4VI/caotvLV.C', N'Admin', N'Admic', CAST(N'1999-01-01T00:00:00.0000000' AS DateTime2), N'Adminova 15', N'ADMIN', N'Resources\Images\The Carver.png', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (2, N'deliverer', N'deliverer@deliverer', N'$2a$11$C9pAbS24n.Y2kYYonAY6UONqcqF7rFciErLqFmzbOV9UQ5QD9Rj1e', N'Deliverer', N'Deliveric', CAST(N'1999-02-02T00:00:00.0000000' AS DateTime2), N'Deliverova 20', N'DELIVERER', N'Resources\Images\dzivdzan.jpg', 0)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (3, N'customer', N'customer@customer', N'$2a$11$2U.hl342q9KxYoecLjbMy.9Qy6FsEsJnOmGZ/aSpkbJgK1.IRYuVy', N'Customer', N'Customic', CAST(N'1999-03-03T00:00:00.0000000' AS DateTime2), N'Customerova 25', N'CUSTOMER', N'Resources\Images\profilePictureThumbUp.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (4, N'Milan', N'milanste999@gmail.com', N'$2a$11$Fn8Mwpfl9pon4tEsLsYuNuVLsA26DKQpcv91.F2TKrw6HUatgn7/K', N'Milan', N'Stevanovic', CAST(N'1999-12-12T00:00:00.0000000' AS DateTime2), N'Preradoviceva 125', N'DELIVERER', N'Resources\Images\milanProfilna.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (5, N'Petar', N'petar@petar', N'$2a$11$Fh8Hy5JWXPYNTJD0KYoUqe0jMjv./Zeg9VBtoE.EiCyAy3Z2L.S3S', N'Petar', N'Petrovic', CAST(N'1995-05-05T00:00:00.0000000' AS DateTime2), N'Petroviceva 30', N'CUSTOMER', N'Resources\Images\profilePictureThumbUp.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (6, N'Marko', N'marko@marko', N'$2a$11$jjeRXhxgiSExa6LXtPxg8uG.W0pra/l7syZMBhuqhxszy9v5niCBa', N'Marko', N'Markovic', CAST(N'1996-06-06T00:00:00.0000000' AS DateTime2), N'Markoviceva 35', N'CUSTOMER', N'Resources\Images\profilePictureThumbUp.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (7, N'Nikola', N'nikola@nikola', N'$2a$11$im6qrtJCXuPCJZPH3AbywOvNrTy1pGCo/j/GlVFdMk0786CavrSY2', N'Nikola', N'Nikolic', CAST(N'1997-07-07T00:00:00.0000000' AS DateTime2), N'Nikoliceva 40', N'CUSTOMER', N'Resources\Images\profilePictureThumbUp.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (8, N'Marija', N'marija@marija', N'$2a$11$IBgSCHJL3gSOOHmq4fGYKeIcMErGaCFd2mC.4gfmjObCTPoOnsnBu', N'Marija', N'Marijanovic', CAST(N'1998-08-08T00:00:00.0000000' AS DateTime2), N'Mariceva 55', N'DELIVERER', N'Resources\Images\profilePictureGirlThumbUp.jpg', 1)
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password], [FirstName], [LastName], [DateOfBirth], [Address], [Role], [ProfilePicture], [Verified]) VALUES (9, N'Milana', N'milana@milana', N'$2a$11$dm.9Dym5AV6cNyFCF1GDKODHWReEPY.IYHQrQQPOfsUwQ0cO3Rtkq', N'Milana', N'Milanovic', CAST(N'1990-10-10T00:00:00.0000000' AS DateTime2), N'Milanoviceva 100', N'DELIVERER', N'Resources\Images\profilePictureGirlThumbUp.jpg', 0)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
