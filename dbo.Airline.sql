USE [airline]
GO

/****** Object: Table [dbo].[Airline] Script Date: 16/11/2022 13:16:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Airline] (
    [Code]        NVARCHAR (50) NOT NULL,
    [AirlineName] NVARCHAR (50) NOT NULL
);


