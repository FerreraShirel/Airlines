USE [airline]
GO

/****** Object: Table [dbo].[Airlines] Script Date: 17/11/2022 23:12:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Airlines] (
    [Code]        NVARCHAR (50) NOT NULL,
    [AirlineName] NVARCHAR (50) NOT NULL
);


