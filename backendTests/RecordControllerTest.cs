using lifecare.Controllers;
using lifecare.Helpers;
using lifecare.DTO;
using lifecare.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Moq;
using System.Collections.Generic;
using System.Security.Claims;
using Xunit;

namespace lifecare.Tests
{
    public class RecordControllerTests
    {
        private readonly RecordController _controller;
        private readonly Mock<IRecordService> _serviceMock;

        public RecordControllerTests()
        {
            _serviceMock = new Mock<IRecordService>();
            _controller = new RecordController(_serviceMock.Object);

        }

        [Fact]
        public void GetAll_ReturnsOkResultWithRecords()
        {
            // Arrange
            var records = new List<RecordDTO>
            {
                new RecordDTO("John Doe", "123456789", "1234567890", "Description 1", "Address 1"),
                new RecordDTO("Jane Smith", "987654321", "9876543210", "Description 2", "Address 2")
            };
            _serviceMock.Setup(x => x.GetAll()).Returns(records);

            // Act
            var result = _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedRecords = Assert.IsType<List<RecordDTO>>(okResult.Value);
            Assert.Equal(records, returnedRecords);
        }

        [Fact]
        public void Create_ValidRecord_ReturnsOkResultWithRecord()
        {
            // Arrange
            var recordDTO = new RecordDTO("John Doe", "123456789", "1234567890", "Some description", "Some address");
            var createdRecord = new RecordDTO("John Doe", "123456789", "1234567890", "Some description", "Some address");
            // createdRecord.Id = 1;

            _serviceMock.Setup(x => x.Create(It.IsAny<RecordDTO>())).Returns((RecordDTO recordDTO) =>
            {
                return createdRecord;
            });

            // Act
            var result = _controller.Create(recordDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedRecord = Assert.IsType<RecordDTO>(okResult.Value);
            Assert.Equal(createdRecord, returnedRecord);
        }

        [Fact]
        public void Update_ValidRecord_ReturnsOkResult()
        {
            // Arrange
            var recordDTO =new RecordDTO("John Doe", "123456789", "1234567890", "Some description", "Some address");
            recordDTO.Id = 1;


            var updatedRecord = new RecordDTO("John Doe", "123456789", "1234567890", "Updated description", "Updated address");
            updatedRecord.Id = 1;
            
            _serviceMock.Setup(x => x.Update(recordDTO)).Returns(updatedRecord);

            // Act
            var result = _controller.Update(recordDTO);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedRecord = Assert.IsType<RecordDTO>(okResult.Value);
            Assert.Equal(updatedRecord, returnedRecord);
        }

        [Fact]
        public void Delete_ExistingRecord_ReturnsOkResult()
        {
            // Arrange
            int recordId = 1;
            var deletedRecord = new RecordDTO("John Doe", "123456789", "1234567890", "Some description", "Some address");
            deletedRecord.Id = recordId;
            _serviceMock.Setup(x => x.Delete(recordId)).Returns(deletedRecord);

            // Act
            var result = _controller.Delete(recordId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedRecord = Assert.IsType<RecordDTO>(okResult.Value);
            Assert.Equal(deletedRecord, returnedRecord);
        }
    }
}