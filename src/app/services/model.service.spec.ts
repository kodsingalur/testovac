import {ModelService} from './model.service';
import {FileService} from './file.service';
import {TestDefinition} from 'app/model/definitions/test-definition';
import {WriteAnswerComponent} from '../adjustable/answer-panel/write-answer/write-answer.component';
import {AdjustableDefinition} from 'app/model/definitions/adjustable-definition';
import {Adjustable} from '../model/adjustable/adjustable';

import * as sxml from 'sxml';
import XML = sxml.XML;
import XMLList = sxml.XMLList;


//Straight Jasmine testing without Angular's testing support
describe('ModelService', () => {
  let service: ModelService;
  beforeEach(() => {
    service = new ModelService(null);
  });

  it('#useMockTest should set mock test to model', () => {
    service.useMockTest();
    expect(service.id).toBe('mock');
  });

  it('#testDefinitionToXml should return xml', () => {
    let xmlStr = service.testDefinitionToXml(new TestDefinition());
    expect(xmlStr).toBe("< type=\"TestDefinition\" id=\"1\" />");
  });
  
  it('#testDefinitionFromXml should return test', () => {
    let test = service.testDefinitionFromXml("< type=\"TestDefinition\" id=\"1\" ><name type=\"string\">XmlTest</name></ >");
    expect(test.name).toBe("XmlTest");
  });
  
  it('#getAdjustable should return xml', () => {
    let res = service.getAdjustable("AnswerPanel");
    let isWriteAnswerComponentThere = res.some(ad=>{
      return ad.type === WriteAnswerComponent;
    });
    expect(isWriteAnswerComponentThere).toBe(true);
  });

});
